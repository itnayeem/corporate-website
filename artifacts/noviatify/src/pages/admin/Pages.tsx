import { useEffect, useState, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import {
  ExternalLink,
  LogOut,
  SlidersHorizontal,
  Pencil,
  KeyRound,
  Check,
  Layers,
} from "lucide-react";
import { useChangeAdminPassword, ApiError } from "@workspace/api-client-react";
import { isAdminAuthed, clearAdminToken } from "@/lib/adminAuth";
import { sitePages } from "@/content/sitePages";

export default function AdminPages() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAdminAuthed()) navigate("/admin");
  }, [navigate]);

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#060d2b] text-white">
      <header className="sticky top-0 z-20 bg-[#060d2b]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-extrabold">Admin Dashboard</h1>
            <p className="text-white/40 text-xs">
              Every page on your site, and your account settings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View site
            </Link>
            <Link
              href="/admin/editor"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Advanced editor
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-10">
        <section>
          <div className="flex items-center gap-2 mb-1">
            <Layers className="w-4 h-4 text-blue-400" />
            <h2 className="text-base font-bold">Your pages</h2>
          </div>
          <p className="text-white/45 text-sm mb-5">
            Click <span className="text-white/70">Open & edit</span> to go to a
            page — then use the floating toolbar to edit any text in place.
          </p>

          <div className="space-y-7">
            {sitePages.map((grp) => (
              <div key={grp.group}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2.5">
                  {grp.group}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {grp.pages.map((page) => (
                    <li key={page.path}>
                      <Link
                        href={page.path}
                        className="group flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 hover:bg-white/10 hover:border-primary/40 transition"
                      >
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-white truncate">
                            {page.label}
                          </span>
                          <span className="block text-xs text-white/40 truncate">
                            {page.path}
                          </span>
                        </span>
                        <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-white/50 group-hover:text-blue-400 transition">
                          <Pencil className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Open &amp; edit</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <ChangePasswordCard />
      </main>
    </div>
  );
}

function ChangePasswordCard() {
  const [, navigate] = useLocation();
  const changePassword = useChangeAdminPassword();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setDone(false);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    changePassword.mutate(
      { data: { currentPassword, newPassword } },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setDone(true);
          setTimeout(() => setDone(false), 4000);
        },
        onError: (err) => {
          if (err instanceof ApiError && err.status === 401) {
            const body = err.data as { error?: string } | null;
            // requireAdmin rejects an invalid/expired token with "Unauthorized";
            // a valid session with the wrong current password gets a different message.
            if (body?.error === "Unauthorized") {
              clearAdminToken();
              navigate("/admin");
              return;
            }
            setError("Your current password is incorrect.");
            return;
          }
          setError("Could not change password. Please try again.");
        },
      },
    );
  };

  const inputClass =
    "w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <KeyRound className="w-4 h-4 text-blue-400" />
        <h2 className="text-base font-bold">Change password</h2>
      </div>
      <p className="text-white/45 text-sm mb-5">
        Update the password you use to sign in to the admin.
      </p>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white/5 border border-white/10 p-6 max-w-md space-y-3"
      >
        <input
          type="password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current password"
          className={inputClass}
        />
        <input
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New password (min 8 characters)"
          className={inputClass}
        />
        <input
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className={inputClass}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <motion.button
          type="submit"
          disabled={
            changePassword.isPending ||
            !currentPassword ||
            !newPassword ||
            !confirmPassword
          }
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition disabled:opacity-50"
        >
          {done ? (
            <>
              <Check className="w-4 h-4" /> Password updated
            </>
          ) : (
            <>{changePassword.isPending ? "Saving…" : "Update password"}</>
          )}
        </motion.button>
      </form>
    </section>
  );
}
