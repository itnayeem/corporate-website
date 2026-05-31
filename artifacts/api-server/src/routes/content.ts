import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteContentTable } from "@workspace/db";
import {
  GetContentResponse,
  UpdateContentBody,
  UpdateContentResponse,
} from "@workspace/api-zod";
import { requireAdmin } from "../lib/auth";

const CONTENT_ID = "main";
const router: IRouter = Router();

router.get("/content", async (_req, res): Promise<void> => {
  const [row] = await db
    .select()
    .from(siteContentTable)
    .where(eq(siteContentTable.id, CONTENT_ID));

  res.json(
    GetContentResponse.parse({
      data: row?.data ?? {},
      updatedAt: row?.updatedAt ? row.updatedAt.toISOString() : null,
    }),
  );
});

router.put("/content", requireAdmin, async (req, res): Promise<void> => {
  const parsed = UpdateContentBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.message }, "Invalid content body");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data.data as Record<string, unknown>;
  const [row] = await db
    .insert(siteContentTable)
    .values({ id: CONTENT_ID, data })
    .onConflictDoUpdate({
      target: siteContentTable.id,
      set: { data, updatedAt: new Date() },
    })
    .returning();

  res.json(
    UpdateContentResponse.parse({
      data: row.data,
      updatedAt: row.updatedAt ? row.updatedAt.toISOString() : null,
    }),
  );
});

export default router;
