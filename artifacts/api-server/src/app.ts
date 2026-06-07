import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import { apiLimiter } from "./lib/rateLimit";
import { logger } from "./lib/logger";

const app: Express = express();

// Behind the Replit / Hostinger reverse proxy. Trusting a fixed number of proxy
// hops makes `req.ip` the real client address (from X-Forwarded-For) so the rate
// limiter buckets by actual client, not by the proxy. A fixed hop count (not
// `true`) keeps it from trusting an attacker-supplied X-Forwarded-For chain.
// Override with TRUST_PROXY_HOPS if the hosting topology adds CDN/proxy hops.
const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS);
app.set(
  "trust proxy",
  Number.isInteger(trustProxyHops) && trustProxyHops >= 0 ? trustProxyHops : 1,
);

// Don't advertise the framework/version.
app.disable("x-powered-by");

// Baseline security headers. Kept conservative so they can't break the SPA the
// API server also serves in production (no CSP here to avoid silent breakage).
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-DNS-Prefetch-Control", "off");
  next();
});

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiLimiter, router);

// In production (e.g. a single-app host like Hostinger) this server also serves
// the built frontend so the whole site runs from one Node process. On Replit
// the frontend is served separately, so this block is skipped in development.
if (process.env.NODE_ENV === "production") {
  const staticDir = process.env.STATIC_DIR
    ? path.resolve(process.env.STATIC_DIR)
    : path.resolve(path.dirname(fileURLToPath(import.meta.url)), "public");

  app.use(express.static(staticDir));

  // SPA fallback: serve index.html for any non-API GET that isn't a real file.
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;
