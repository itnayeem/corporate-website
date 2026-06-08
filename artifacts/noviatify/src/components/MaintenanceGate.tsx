import { type ReactNode } from "react";
import { useLocation } from "wouter";
import { useContent } from "@/content/ContentContext";
import { useEditMode } from "@/content/EditModeContext";
import MaintenancePage from "@/components/MaintenancePage";

/**
 * Gates the public site behind maintenance mode.
 *
 * When `site.maintenance.enabled` is on, ordinary visitors see the
 * MaintenancePage. The admin (logged in) always sees the real site so they can
 * keep working, and `/owner*` routes stay reachable so the owner can still log
 * in and toggle maintenance off.
 */
export default function MaintenanceGate({ children }: { children: ReactNode }) {
  const { isAdmin } = useEditMode();
  const { maintenance } = useContent().site;
  const [location] = useLocation();

  const onAdminRoute = location.startsWith("/owner");

  if (maintenance?.enabled && !isAdmin && !onAdminRoute) {
    return <MaintenancePage />;
  }

  return <>{children}</>;
}
