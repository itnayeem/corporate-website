import { Router, type IRouter } from "express";
import {
  AdminLoginBody,
  AdminLoginResponse,
  ChangeAdminPasswordBody,
} from "@workspace/api-zod";
import { checkPassword, createToken, setPassword, requireAdmin } from "../lib/auth";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (!(await checkPassword(parsed.data.password))) {
    req.log.warn("Failed admin login attempt");
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  res.json(AdminLoginResponse.parse({ token: createToken() }));
});

router.put(
  "/admin/password",
  requireAdmin,
  async (req, res): Promise<void> => {
    const parsed = ChangeAdminPasswordBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    if (!(await checkPassword(parsed.data.currentPassword))) {
      req.log.warn("Failed admin password change: wrong current password");
      res.status(401).json({ error: "Current password is incorrect" });
      return;
    }

    await setPassword(parsed.data.newPassword);
    req.log.info("Admin password changed");
    res.status(204).send();
  },
);

export default router;
