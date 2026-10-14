import { defineConfig } from "drizzle-kit";
import path from "path";

if (!process.env.DATABASE_URL) {
  try {
    process.loadEnvFile?.();
  } catch {}
  try {
    process.loadEnvFile?.(path.join(__dirname, "../../.env"));
  } catch {}
}

const url =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/itnayeem";

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "postgresql",
  dbCredentials: {
    url,
  },
});
