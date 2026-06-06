import { promises as fs } from "fs";
import path from "path";

/**
 * Local filesystem storage for uploaded branding images (logo/favicon).
 *
 * Files are written to a single flat directory (default `public/uploads/`,
 * overridable with the `UPLOADS_DIR` env var) and served back by the API.
 * This intentionally replaces any third-party object-storage service: the only
 * writer is the admin-gated upload route, and every file is a public image.
 */

const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.resolve(process.cwd(), "public/uploads");

const EXT_BY_CONTENT_TYPE: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
  "image/x-icon": "ico",
  "image/vnd.microsoft.icon": "ico",
};

const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  svg: "image/svg+xml",
  avif: "image/avif",
  ico: "image/x-icon",
};

/** A generated upload name is `<uuid>.<ext>` — nothing else is accepted. */
const VALID_NAME = /^[a-f0-9-]{36}\.(png|jpg|jpeg|webp|gif|svg|avif|ico)$/;

export class UploadNotFoundError extends Error {
  constructor() {
    super("Upload not found");
    this.name = "UploadNotFoundError";
    Object.setPrototypeOf(this, UploadNotFoundError.prototype);
  }
}

/** Map an upload Content-Type to a file extension, or null if unsupported. */
export function extForContentType(contentType: string): string | null {
  return EXT_BY_CONTENT_TYPE[contentType.toLowerCase()] ?? null;
}

/** Resolve the Content-Type to serve a stored file with, from its extension. */
export function contentTypeForFile(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPE_BY_EXT[ext] ?? "application/octet-stream";
}

/** Guard against path traversal / unexpected names before touching disk. */
export function isValidUploadName(filename: string): boolean {
  return VALID_NAME.test(filename);
}

async function ensureDir(): Promise<void> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

/** Persist an uploaded image. Caller must validate the name and content first. */
export async function saveUpload(
  filename: string,
  data: Buffer,
): Promise<void> {
  await ensureDir();
  await fs.writeFile(path.join(UPLOADS_DIR, filename), data);
}

/** Read a stored image, throwing UploadNotFoundError if it does not exist. */
export async function readUpload(filename: string): Promise<Buffer> {
  try {
    return await fs.readFile(path.join(UPLOADS_DIR, filename));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      throw new UploadNotFoundError();
    }
    throw err;
  }
}
