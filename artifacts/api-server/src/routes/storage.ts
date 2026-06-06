import express, {
  Router,
  type IRouter,
  type Request,
  type Response,
} from "express";
import { randomUUID } from "crypto";
import {
  RequestUploadUrlBody,
  RequestUploadUrlResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";
import {
  contentTypeForFile,
  extForContentType,
  isValidUploadName,
  readUpload,
  saveUpload,
  UploadNotFoundError,
} from "../lib/localStorage";

const router: IRouter = Router();

const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

/**
 * POST /storage/uploads/request-url
 *
 * Reserve a local upload slot. The client sends JSON metadata (name, size,
 * contentType) — NOT the file — and gets back a same-origin `uploadURL` to PUT
 * the bytes to, plus the `objectPath` to persist and render the image from.
 */
router.post(
  "/storage/uploads/request-url",
  requireAdmin,
  (req: Request, res: Response) => {
    const parsed = RequestUploadUrlBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Missing or invalid required fields" });
      return;
    }

    const { name, size, contentType } = parsed.data;

    // This app only uploads public branding images (logo/favicon).
    const ext = extForContentType(contentType);
    if (!ext) {
      res.status(400).json({ error: "Only image uploads are allowed" });
      return;
    }
    if (size > MAX_UPLOAD_BYTES) {
      res.status(400).json({ error: "File is too large (max 8 MB)" });
      return;
    }

    const filename = `${randomUUID()}.${ext}`;
    res.json(
      RequestUploadUrlResponse.parse({
        uploadURL: `/api/storage/uploads/${filename}`,
        objectPath: `/objects/${filename}`,
        metadata: { name, size, contentType },
      }),
    );
  },
);

/**
 * PUT /storage/uploads/:filename
 *
 * Receive the raw image bytes and write them to local storage. Admin-gated and
 * restricted to image content types. The filename is the one minted by
 * request-url above (`<uuid>.<ext>`), validated here to prevent path traversal.
 */
router.put(
  "/storage/uploads/:filename",
  requireAdmin,
  express.raw({ type: () => true, limit: MAX_UPLOAD_BYTES }),
  async (req: Request, res: Response) => {
    const filename = String(req.params.filename);
    if (!isValidUploadName(filename)) {
      res.status(400).json({ error: "Invalid file name" });
      return;
    }
    if (!(req.get("content-type") ?? "").toLowerCase().startsWith("image/")) {
      res.status(400).json({ error: "Only image uploads are allowed" });
      return;
    }
    const body = req.body;
    if (!Buffer.isBuffer(body) || body.length === 0) {
      res.status(400).json({ error: "Empty upload" });
      return;
    }

    try {
      await saveUpload(filename, body);
      res.status(200).json({ objectPath: `/objects/${filename}` });
    } catch (error) {
      req.log.error({ err: error }, "Error saving upload");
      res.status(500).json({ error: "Failed to save upload" });
    }
  },
);

/**
 * GET /storage/objects/:filename
 *
 * Serve a stored branding image. Intentionally public (no auth/ACL): the only
 * writer is the admin-gated upload route and every file is a public image.
 */
router.get(
  "/storage/objects/:filename",
  async (req: Request, res: Response) => {
    const filename = String(req.params.filename);
    if (!isValidUploadName(filename)) {
      res.status(404).json({ error: "Object not found" });
      return;
    }
    try {
      const buffer = await readUpload(filename);
      res.setHeader("Content-Type", contentTypeForFile(filename));
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.status(200).end(buffer);
    } catch (error) {
      if (error instanceof UploadNotFoundError) {
        res.status(404).json({ error: "Object not found" });
        return;
      }
      req.log.error({ err: error }, "Error serving object");
      res.status(500).json({ error: "Failed to serve object" });
    }
  },
);

export default router;
