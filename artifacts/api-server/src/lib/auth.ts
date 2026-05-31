import crypto from "node:crypto";
import type { RequestHandler } from "express";

const SECRET = process.env.SESSION_SECRET;
if (!SECRET) {
  throw new Error(
    "SESSION_SECRET is required but not set. Configure it before starting the server.",
  );
}
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

/**
 * Constant-time comparison of the supplied password against the configured
 * ADMIN_PASSWORD secret. Returns false when no admin password is configured.
 */
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Create a signed, expiring session token (HMAC over the payload). */
export function createToken(): string {
  const body = Buffer.from(
    JSON.stringify({ exp: Date.now() + TOKEN_TTL_MS }),
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

/** Verify a session token signature and expiry. */
export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [body, sig] = parts;
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false;
  }
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      exp?: number;
    };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

/** Express middleware that requires a valid admin bearer token. */
export const requireAdmin: RequestHandler = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!verifyToken(token)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};
