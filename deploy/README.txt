Noviatify - Hostinger shared hosting (Node.js / Passenger)
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
