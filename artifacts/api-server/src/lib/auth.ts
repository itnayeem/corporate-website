import crypto from "node:crypto";
import type { RequestHandler } from "express";
import { eq } from "drizzle-orm";
import { db, adminSettingsTable } from "@workspace/db";

const PASSWORD_KEY = "password_hash";

if (!process.env.SESSION_SECRET) {
  throw new Error(
    "SESSION_SECRET is required but not set. Configure it before starting the server.",
  );
}
const SECRET: string = process.env.SESSION_SECRET;
const TOKEN_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

/** Hash a password with scrypt and a random salt: `scrypt$<salt>$<hash>`. */
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${derived.toString("hex")}`;
}

/** Constant-time verify a password against a stored scrypt hash. */
function verifyHash(password: string, stored: string): boolean {
  const [scheme, saltHex, hashHex] = stored.split("$");
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  let derived: Buffer;
  try {
    derived = crypto.scryptSync(password, salt, expected.length);
  } catch {
    return false;
  }
  return (
    derived.length === expected.length && crypto.timingSafeEqual(derived, expected)
  );
}

async function getStoredPasswordHash(): Promise<string | null> {
  const [row] = await db
    .select()
    .from(adminSettingsTable)
    .where(eq(adminSettingsTable.key, PASSWORD_KEY));
  return row?.value ?? null;
}

/**
 * Verify the supplied password. If an admin password has been set (stored as a
 * scrypt hash in the DB) it is used; otherwise we fall back to the
 * ADMIN_PASSWORD env secret so the owner can log in before setting one.
 */
export async function checkPassword(password: string): Promise<boolean> {
  const stored = await getStoredPasswordHash();
  if (stored) return verifyHash(password, stored);

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

/** Persist a new admin password (stored as a scrypt hash). */
export async function setPassword(newPassword: string): Promise<void> {
  const value = hashPassword(newPassword);
  await db
    .insert(adminSettingsTable)
    .values({ key: PASSWORD_KEY, value })
    .onConflictDoUpdate({
      target: adminSettingsTable.key,
      set: { value, updatedAt: new Date() },
    });
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
