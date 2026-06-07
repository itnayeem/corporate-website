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
execSync("npm run build:standalone", { stdio: "inherit", cwd: root });

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
const path = require("node:path");

process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || "3000";
process.env.STATIC_DIR =
  process.env.STATIC_DIR || path.join(__dirname, "public");

import("./index.mjs").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
`;
await writeFile(path.join(deployDir, "app.js"), appJs);

// 5. Minimal package.json so the Node.js Selector is happy. No dependencies: the
//    server bundle is fully self-contained, so no npm install is needed on the host.
const pkg = {
  name: "noviatify",
  version: "1.0.0",
  private: true,
  main: "app.js",
  scripts: { start: "node app.js" },
};
await writeFile(
  path.join(deployDir, "package.json"),
  JSON.stringify(pkg, null, 2) + "\n",
);

// 6. Short upload guide inside the bundle.
const readme = `Noviatify - Hostinger shared hosting (Node.js / Passenger)
==========================================================

You do NOT need node, npm, or pnpm on SSH. Everything is pre-built and bundled;
there is nothing to install. Just use hPanel's Node.js app feature.

Steps
-----
1. hPanel -> Advanced -> Node.js -> Create application.
2. Node.js version: 20 or higher (24 if offered).
3. Application root: the folder where you upload these files (e.g. "noviatify").
4. Application URL: your domain.
5. Application startup file: app.js
6. Create the app.
7. Get these files into the application root, either:
     a) GitHub (recommended): hPanel -> Advanced -> Git -> connect your repo, and
        set this app's "Application root" to the repo's "deploy" folder; OR
     b) Manual upload: upload ALL files from this folder (app.js, index.mjs,
        package.json, the pino-*.mjs / thread-stream-worker.mjs files, public/).
8. Add environment variables (in the Node.js app's "Environment variables"):
     DATABASE_URL    = your external Postgres (Neon) connection string
     SESSION_SECRET  = a long random string
     ADMIN_PASSWORD  = your admin login password
   (NODE_ENV is set automatically.)
9. Click "Restart" on the app. Open your domain - the site, the API (/api), and
   the admin login (/owner) are all served by this one app.

Notes
-----
- No "Run NPM Install" step is required; this app has no dependencies.
- Uploaded logo/favicon images are saved on the server disk under public/uploads.
  Re-upload them from /owner if they ever reset after a redeploy.
`;
await writeFile(path.join(deployDir, "README.txt"), readme);

console.log("\n\u2705 Hostinger deploy bundle ready in ./deploy");
console.log("   Zip its contents and upload to your hPanel Node.js app root.");
