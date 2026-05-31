import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Save, LogOut, RotateCcw, Check, ExternalLink } from "lucide-react";
import {
  useGetContent,
  useUpdateContent,
  getGetContentQueryKey,
  ApiError,
} from "@workspace/api-client-react";
import { defaultContent } from "@/content/defaultContent";
import { deepMerge } from "@/content/ContentContext";
import { isAdminAuthed, clearAdminToken } from "@/lib/adminAuth";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function AdminEditor() {
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { data, isLoading } = useGetContent();
  const update = useUpdateContent();
  const [draft, setDraft] = useState<unknown>(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAdminAuthed()) navigate("/admin");
  }, [navigate]);

  useEffect(() => {
    if (!isLoading) {
      const override = (data?.data as Record<string, unknown> | undefined) ?? {};
      setDraft(deepMerge(defaultContent, override));
    }
  }, [isLoading, data]);

  const handleSave = () => {
    setError("");
    update.mutate(
      { data: { data: draft as Record<string, unknown> } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetContentQueryKey() });
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        },
        onError: (err) => {
          if (err instanceof ApiError && err.status === 401) {
            clearAdminToken();
            navigate("/admin");
            return;
          }
          setError("Could not save changes. Please try again.");
        },
      },
    );
  };

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin");
  };

  const handleReset = () => {
    if (confirm("Reset all content back to the original defaults? Unsaved.")) {
      setDraft(structuredClone(defaultContent));
    }
  };

  return (
    <div className="min-h-screen bg-[#060d2b] text-white">
      <header className="sticky top-0 z-20 bg-[#060d2b]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-extrabold">Content Editor</h1>
            <p className="text-white/40 text-xs">Edit any text on your site, then save.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View site
            </Link>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
            <motion.button
              onClick={handleSave}
              disabled={update.isPending || draft == null}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition disabled:opacity-50"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" /> Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> {update.isPending ? "Saving…" : "Save"}
                </>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
        {isLoading || draft == null ? (
          <p className="text-white/50">Loading content…</p>
        ) : (
          <ContentEditor value={draft} onChange={setDraft} />
        )}
      </main>
    </div>
  );
}
