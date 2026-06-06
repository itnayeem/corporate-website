import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Save,
  Check,
  RotateCcw,
  LogOut,
  Eye,
  SlidersHorizontal,
  LayoutGrid,
} from "lucide-react";
import { useEditMode } from "@/content/EditModeContext";

export function EditToolbar() {
  const [location] = useLocation();
  const {
    isAdmin,
    editMode,
    enterEdit,
    exitEdit,
    dirty,
    saving,
    justSaved,
    error,
    save,
    discard,
    logout,
  } = useEditMode();

  if (!isAdmin) return null;
  if (location.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <AnimatePresence mode="wait">
        {!editMode ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-[#0b1638]/95 backdrop-blur border border-white/10 shadow-2xl shadow-black/40 px-2 py-2"
          >
            <span className="hidden sm:flex items-center gap-1.5 pl-2 pr-1 text-xs font-semibold text-white/50">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Admin
            </span>
            <button
              onClick={enterEdit}
              className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              <Pencil className="w-4 h-4" /> Edit this page
            </button>
            <Link
              href="/admin/pages"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-full hover:bg-white/5 transition"
              title="All pages & settings"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pages</span>
            </Link>
            <Link
              href="/admin/editor"
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-full hover:bg-white/5 transition"
              title="Advanced editor"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Advanced</span>
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center text-white/40 hover:text-white w-8 h-8 rounded-full hover:bg-white/5 transition"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="editing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto flex items-center gap-1.5 rounded-2xl bg-[#0b1638]/95 backdrop-blur border border-primary/40 shadow-2xl shadow-blue-950/50 px-2.5 py-2"
          >
            <span className="hidden md:flex items-center gap-2 pl-1.5 pr-2 text-xs font-semibold text-white/55">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              {error ? (
                <span className="text-red-300">{error}</span>
              ) : (
                <>Editing — click any text{dirty ? " · unsaved" : ""}</>
              )}
            </span>
            <button
              onClick={discard}
              disabled={!dirty || saving}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-white/5 transition disabled:opacity-40 disabled:hover:bg-transparent"
              title="Discard changes"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discard</span>
            </button>
            <button
              onClick={exitEdit}
              className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-medium px-3 py-2 rounded-xl hover:bg-white/5 transition"
              title="Exit edit mode"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </button>
            <motion.button
              onClick={save}
              disabled={saving || (!dirty && !justSaved)}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition disabled:opacity-50"
            >
              {justSaved ? (
                <>
                  <Check className="w-4 h-4" /> Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save"}
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
