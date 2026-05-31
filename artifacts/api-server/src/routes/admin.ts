import { Router, type IRouter } from "express";
import { AdminLoginBody, AdminLoginResponse } from "@workspace/api-zod";
import { checkPassword, createToken } from "../lib/auth";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (!checkPassword(parsed.data.password)) {
    req.log.warn("Failed admin login attempt");
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  res.json(AdminLoginResponse.parse({ token: createToken() }));
});

export default router;
