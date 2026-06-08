import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ExternalLink,
  LogOut,
  Pencil,
  KeyRound,
  Check,
  Layers,
  Palette,
  Upload,
  ImageIcon,
  Wrench,
} from "lucide-react";
import {
  useChangeAdminPassword,
  useUpdateContent,
  useRequestUploadUrl,
  getGetContentQueryKey,
  ApiError,
} from "@workspace/api-client-react";
import { isAdminAuthed, clearAdminToken, getAdminToken } from "@/lib/adminAuth";
import { sitePages } from "@/content/sitePages";
import { useContent } from "@/content/ContentContext";
import SiteLogo, { resolveAssetUrl } from "@/components/SiteLogo";
import { CropModal } from "@/components/admin/CropModal";

export default function AdminPages() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAdminAuthed()) navigate("/owner");
  }, [navigate]);

  const handleLogout = () => {
    clearAdminToken();
    navigate("/owner");
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

        <MaintenanceCard />

        <BrandingCard />

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
              navigate("/owner");
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

function MaintenanceCard() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const content = useContent();
  const maintenance = content.site.maintenance;

  const update = useUpdateContent();

  const [title, setTitle] = useState(maintenance.title);
  const [message, setMessage] = useState(maintenance.message);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  // Re-seed the form whenever the persisted maintenance content changes.
  useEffect(() => {
    setTitle(maintenance.title);
    setMessage(maintenance.message);
  }, [maintenance.title, maintenance.message]);

  const handleAuthError = (err: unknown): boolean => {
    if (err instanceof ApiError && err.status === 401) {
      clearAdminToken();
      navigate("/owner");
      return true;
    }
    return false;
  };

  const persist = (next: typeof content, onOk?: () => void) => {
    setError("");
    setDone(false);
    update.mutate(
      { data: { data: next as unknown as Record<string, unknown> } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetContentQueryKey() });
          onOk?.();
        },
        onError: (err) => {
          if (handleAuthError(err)) return;
          setError("Could not save. Please try again.");
        },
      },
    );
  };

  const buildNext = (over: Partial<typeof maintenance>): typeof content => ({
    ...content,
    site: {
      ...content.site,
      maintenance: { ...content.site.maintenance, ...over },
    },
  });

  const handleToggle = () => {
    persist(buildNext({ enabled: !maintenance.enabled }));
  };

  const handleSaveText = () => {
    persist(buildNext({ title: title.trim(), message: message.trim() }), () => {
      setDone(true);
      setTimeout(() => setDone(false), 4000);
    });
  };

  const inputClass =
    "w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary";
  const enabled = maintenance.enabled;

  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <Wrench className="w-4 h-4 text-blue-400" />
        <h2 className="text-base font-bold">Maintenance mode</h2>
      </div>
      <p className="text-white/45 text-sm mb-5">
        When on, visitors see a “we'll be right back” page instead of your site.
        You stay logged in and still see the real site, so you can keep working.
      </p>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 max-w-md space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">
              {enabled ? "Maintenance mode is ON" : "Maintenance mode is off"}
            </p>
            <p className="text-xs text-white/45 mt-0.5">
              {enabled
                ? "Visitors currently see the maintenance page."
                : "Your site is live for everyone."}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={enabled}
            aria-label="Toggle maintenance mode"
            onClick={handleToggle}
            disabled={update.isPending}
            className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition disabled:opacity-50 ${
              enabled ? "bg-primary" : "bg-white/15"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {enabled && (
          <div className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
            Your site is hidden from the public right now. Turn this off to make
            it live again.
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/60">Heading</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="We'll be right back"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/60">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell visitors what's happening…"
            rows={4}
            className={`${inputClass} resize-none`}
          />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <motion.button
          type="button"
          onClick={handleSaveText}
          disabled={update.isPending || !title.trim() || !message.trim()}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition disabled:opacity-50"
        >
          {done ? (
            <>
              <Check className="w-4 h-4" /> Message saved
            </>
          ) : (
            <>{update.isPending ? "Saving…" : "Save message"}</>
          )}
        </motion.button>
      </div>
    </section>
  );
}

function BrandingCard() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const content = useContent();
  const brand = content.site.brand;

  const update = useUpdateContent();
  const requestUpload = useRequestUploadUrl();
  const logoInput = useRef<HTMLInputElement>(null);
  const faviconInput = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(brand.name);
  const [slogan, setSlogan] = useState(brand.slogan ?? "");
  const [logoUrl, setLogoUrl] = useState(brand.logoUrl ?? "");
  const [faviconUrl, setFaviconUrl] = useState(brand.faviconUrl ?? "");
  const [tidioKey, setTidioKey] = useState(brand.tidioKey ?? "");
  const [uploading, setUploading] = useState<"logo" | "favicon" | null>(null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [cropping, setCropping] = useState<{
    file: File;
    which: "logo" | "favicon";
  } | null>(null);

  // Re-seed the form whenever the persisted brand changes (e.g. after save).
  useEffect(() => {
    setName(brand.name);
    setSlogan(brand.slogan ?? "");
    setLogoUrl(brand.logoUrl ?? "");
    setFaviconUrl(brand.faviconUrl ?? "");
    setTidioKey(brand.tidioKey ?? "");
  }, [brand.name, brand.slogan, brand.logoUrl, brand.faviconUrl, brand.tidioKey]);

  const handleAuthError = (err: unknown): boolean => {
    if (err instanceof ApiError && err.status === 401) {
      clearAdminToken();
      navigate("/owner");
      return true;
    }
    return false;
  };

  const startUpload = (file: File, which: "logo" | "favicon") => {
    setError("");
    setDone(false);
    setCropping({ file, which });
  };

  const uploadFile = async (file: File, which: "logo" | "favicon") => {
    setError("");
    setDone(false);
    setUploading(which);
    try {
      const res = await requestUpload.mutateAsync({
        data: { name: file.name, size: file.size, contentType: file.type },
      });
      const token = getAdminToken();
      const put = await fetch(res.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: file,
      });
      if (!put.ok) {
        if (put.status === 401) throw new Error("unauthorized");
        throw new Error("upload failed");
      }
      if (which === "logo") setLogoUrl(res.objectPath);
      else setFaviconUrl(res.objectPath);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError("Could not upload the image. Please try again.");
    } finally {
      setUploading(null);
    }
  };

  const handleSave = () => {
    setError("");
    setDone(false);
    const next = {
      ...content,
      site: {
        ...content.site,
        brand: { ...content.site.brand, name, slogan, logoUrl, faviconUrl, tidioKey: tidioKey.trim() },
      },
    };
    update.mutate(
      { data: { data: next as unknown as Record<string, unknown> } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetContentQueryKey() });
          setDone(true);
          setTimeout(() => setDone(false), 4000);
        },
        onError: (err) => {
          if (handleAuthError(err)) return;
          setError("Could not save branding. Please try again.");
        },
      },
    );
  };

  const inputClass =
    "w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary";
  const faviconSrc = resolveAssetUrl(faviconUrl);

  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <Palette className="w-4 h-4 text-blue-400" />
        <h2 className="text-base font-bold">Branding</h2>
      </div>
      <p className="text-white/45 text-sm mb-5">
        Change your logo, favicon, site name, and slogan. These appear across the
        whole site.
      </p>

      <div className="rounded-2xl bg-white/5 border border-white/10 p-6 max-w-md space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/60">Site name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your business name"
            className={inputClass}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/60">Slogan</label>
          <input
            type="text"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            placeholder="A short tagline"
            className={inputClass}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/60">Logo</label>
          <div className="flex items-center gap-4">
            <div className="h-12 w-32 rounded-lg bg-[#060d2b] border border-white/10 flex items-center justify-center overflow-hidden">
              <SiteLogo className="max-h-9 max-w-28 w-auto" />
            </div>
            <input
              ref={logoInput}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) startUpload(f, "logo");
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => logoInput.current?.click()}
              disabled={uploading === "logo"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 border border-white/15 px-3 py-2 rounded-lg hover:bg-white/5 transition disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading === "logo" ? "Uploading…" : "Upload logo"}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-white/60">
            Favicon{" "}
            <span className="font-normal text-white/35">
              (browser tab icon)
            </span>
          </label>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-[#060d2b] border border-white/10 flex items-center justify-center overflow-hidden">
              {faviconSrc ? (
                <img src={faviconSrc} alt="Favicon" className="h-7 w-7 object-contain" />
              ) : (
                <ImageIcon className="w-5 h-5 text-white/25" />
              )}
            </div>
            <input
              ref={faviconInput}
              type="file"
              accept="image/png,image/x-icon,image/svg+xml,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) startUpload(f, "favicon");
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => faviconInput.current?.click()}
              disabled={uploading === "favicon"}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 border border-white/15 px-3 py-2 rounded-lg hover:bg-white/5 transition disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              {uploading === "favicon" ? "Uploading…" : "Upload favicon"}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-white/60">
            Live chat{" "}
            <span className="font-normal text-white/35">(Tidio public key)</span>
          </label>
          <input
            type="text"
            value={tidioKey}
            onChange={(e) => setTidioKey(e.target.value)}
            placeholder="e.g. abc123yourkey"
            className={inputClass}
          />
          <p className="text-[11px] text-white/35 leading-snug">
            Paste the key from your Tidio install snippet (the part in{" "}
            <code>code.tidio.co/&lt;key&gt;.js</code>). Leave empty to turn off live
            chat. Changes apply after a page refresh.
          </p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <motion.button
          type="button"
          onClick={handleSave}
          disabled={update.isPending || uploading !== null}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-1.5 bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition disabled:opacity-50"
        >
          {done ? (
            <>
              <Check className="w-4 h-4" /> Branding saved
            </>
          ) : (
            <>{update.isPending ? "Saving…" : "Save branding"}</>
          )}
        </motion.button>
      </div>

      {cropping && (
        <CropModal
          file={cropping.file}
          title={cropping.which === "logo" ? "Crop your logo" : "Crop your favicon"}
          maxOutput={cropping.which === "logo" ? 512 : 256}
          aspectOptions={
            cropping.which === "logo"
              ? [
                  { label: "Wide", value: 3 },
                  { label: "Standard", value: 4 / 3 },
                  { label: "Square", value: 1 },
                ]
              : [{ label: "Square", value: 1 }]
          }
          onCancel={() => setCropping(null)}
          onCropped={(cropped) => {
            const { which } = cropping;
            setCropping(null);
            uploadFile(cropped, which);
          }}
        />
      )}
    </section>
  );
}
