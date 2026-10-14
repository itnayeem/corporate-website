import app from "./app";
import { logger } from "./lib/logger";

try {
  process.loadEnvFile?.();
} catch {}
try {
  process.loadEnvFile?.(new URL("../../../.env", import.meta.url));
} catch {}

const rawPort = process.env["PORT"] || "5050";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
