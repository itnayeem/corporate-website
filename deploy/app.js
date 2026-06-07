// Hostinger shared-hosting (Passenger / CloudLinux Node.js Selector) startup file.
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
