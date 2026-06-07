import type { RequestHandler } from "express";

/**
 * Minimal, dependency-free, in-memory fixed-window rate limiter.
 *
 * Keyed by client IP (so `app.set("trust proxy", ...)` must be configured for
 * the limiter to see the real client address behind the Replit/Hostinger
 * reverse proxy). State is per-process, which is correct for this app's
 * single-instance deploy model (see replit.md). It is intentionally simple:
 * its job is to stop scripted brute-force / abuse, not to be a distributed
 * quota system.
 *
 * Concurrency: admission counts BOTH settled hits (`count`) and in-flight
 * requests (`pending`). Without counting `pending`, an attacker could fire many
 * parallel login attempts that are all admitted before any of their failures
 * are recorded — bypassing the cap. Counting in-flight requests closes that.
 */
interface Bucket {
  /** Settled hits that count toward the limit. */
  count: number;
  /** In-flight requests admitted but not yet resolved. */
  pending: number;
  /** Epoch ms when this window resets. */
  resetAt: number;
}

interface RateLimitOptions {
  /** Fixed window length in milliseconds. */
  windowMs: number;
  /** Max requests allowed per key per window. */
  max: number;
  /** Message returned in the 429 body. */
  message?: string;
  /**
   * When true, only requests that finish with a 4xx/5xx status count toward the
   * limit. Used for login so a legitimate, successful sign-in never consumes the
   * owner's own quota — only failed guesses do. In-flight attempts still occupy
   * a slot (via `pending`) until they resolve, which is what makes the cap hold
   * under concurrent attacks.
   */
  countFailuresOnly?: boolean;
}

function clientKey(ip: string | undefined, fallback: string | undefined): string {
  return ip || fallback || "unknown";
}

export function createRateLimiter(options: RateLimitOptions): RequestHandler {
  const {
    windowMs,
    max,
    message = "Too many requests. Please try again later.",
    countFailuresOnly = false,
  } = options;

  const buckets = new Map<string, Bucket>();

  // Periodically evict expired buckets so memory can't grow unbounded under a
  // spray of distinct source IPs. `unref` keeps this timer from holding the
  // process open on shutdown.
  const sweeper = setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now && bucket.pending <= 0) buckets.delete(key);
    }
  }, windowMs);
  sweeper.unref?.();

  return (req, res, next) => {
    const now = Date.now();
    const key = clientKey(req.ip, req.socket.remoteAddress ?? undefined);

    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      // Preserve in-flight requests from a just-expired window so their slots
      // aren't double-counted when they settle against a fresh window.
      const pending = bucket && bucket.resetAt <= now ? bucket.pending : 0;
      bucket = { count: 0, pending, resetAt: now + windowMs };
      buckets.set(key, bucket);
    }

    const used = bucket.count + bucket.pending;
    const remaining = Math.max(0, max - used);
    res.setHeader("RateLimit-Limit", String(max));
    res.setHeader("RateLimit-Reset", String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))));

    if (used >= max) {
      const retryAfterSec = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      res.setHeader("RateLimit-Remaining", "0");
      res.setHeader("Retry-After", String(retryAfterSec));
      req.log?.warn({ ip: key, path: req.path }, "Rate limit exceeded");
      res.status(429).json({ error: message });
      return;
    }

    res.setHeader("RateLimit-Remaining", String(Math.max(0, remaining - 1)));

    if (countFailuresOnly) {
      // Hold a slot while the request is in flight; convert it to a settled hit
      // only on failure. Guarded so abort (`close`) and normal end (`finish`)
      // can't double-release.
      bucket.pending += 1;
      let settled = false;
      const settle = () => {
        if (settled) return;
        settled = true;
        bucket!.pending -= 1;
        if (res.statusCode >= 400) bucket!.count += 1;
      };
      res.on("finish", settle);
      res.on("close", settle);
    } else {
      bucket.count += 1;
    }

    next();
  };
}

/**
 * Strict limiter for the admin login endpoint. Only failed attempts count, so a
 * brute-force script is throttled hard while the owner can always log in.
 */
export const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 failed attempts per IP per window
  message: "Too many login attempts. Please wait a few minutes and try again.",
  countFailuresOnly: true,
});

/**
 * Generous catch-all limiter for the whole API. Sits far above normal usage
 * (page loads + content polling) but caps scripted abuse / DoS probing.
 */
export const apiLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 240, // 240 requests per IP per minute
  message: "Too many requests. Please slow down.",
});
