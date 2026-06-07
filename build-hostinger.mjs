// Assembles a self-contained, Passenger-ready bundle for Hostinger shared hosting
// (CloudLinux Node.js Selector). Output goes to ./deploy — zip it and upload it to
// your Node.js application root in hPanel.
//
// The api-server is bundled by esbuild into a single dist/index.mjs with all npm
// dependencies inlined, so the uploaded folder needs NO node_modules at runtime.
import { execSync } from "node:child_process";
import { rm, mkdir, cp, writeFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(root, "artifacts", "api-server", "dist");
const deployDir = path.join(root, "deploy");

// 1. Build the frontend + the server bundle and copy the site into the bundle.
execSync("pnpm run build:standalone", { stdio: "inherit", cwd: root });

// 2. Start from a clean deploy directory.
await rm(deployDir, { recursive: true, force: true });
await mkdir(deployDir, { recursive: true });

// 3. Copy the built server (index.mjs, pino sidecar workers, public/), but skip
//    source maps to keep the upload small.
for (const entry of await readdir(distDir, { withFileTypes: true })) {
  if (entry.name.endsWith(".map")) continue;
  await cp(path.join(distDir, entry.name), path.join(deployDir, entry.name), {
    recursive: true,
  });
}

// 4. Passenger startup file. CloudLinux/Passenger loads this CommonJS file, patches
//    Node's http server, then our ESM bundle's app.listen() is intercepted. PORT is
//    only a fallback — Passenger assigns the real listening socket itself.
const appJs = `// Hostinger shared-hosting (Passenger / CloudLinux Node.js Selector) startup file.
// Set this as the "Application startup file" in hPanel. Do not run it manually.
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || "3000";

import("./index.mjs").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
`;
await writeFile(path.join(deployDir, "app.js"), appJs);

// 5. Minimal package.json so the Node.js Selector is happy. No dependencies: the
//    server bundle is fully self-contained.
const pkg = {
  name: "noviatify",
  version: "1.0.0",
  private: true,
  scripts: { start: "node app.js" },
};
await writeFile(
  path.join(deployDir, "package.json"),
  JSON.stringify(pkg, null, 2) + "\n",
);

console.log("\n\u2705 Hostinger deploy bundle ready in ./deploy");
console.log("   Zip its contents and upload to your hPanel Node.js app root.");
