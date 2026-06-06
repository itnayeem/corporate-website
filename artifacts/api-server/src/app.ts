import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

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

app.use("/api", router);

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
