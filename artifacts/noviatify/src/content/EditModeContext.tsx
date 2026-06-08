import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useUpdateContent,
  getGetContentQueryKey,
  ApiError,
} from "@workspace/api-client-react";
import { useContent, deepMerge } from "@/content/ContentContext";
import { getByPath, setByPath } from "@/content/paths";
import { isAdminAuthed, clearAdminToken } from "@/lib/adminAuth";
import { defaultContent, type SiteContent } from "@/content/defaultContent";

interface EditModeValue {
  /** True when an admin token is present. */
  isAdmin: boolean;
  /** True while the live inline editor is active. */
  editMode: boolean;
  enterEdit: () => void;
  exitEdit: () => void;
  /** Read the current value at a dot-path (draft while editing, else live). */
  getValue: (path: string) => unknown;
  /** Write a value into the draft at a dot-path. */
  setValue: (path: string, value: unknown) => void;
  /**
   * Atomically update the draft value at a dot-path using the latest draft.
   * Use this for structural changes (e.g. add/remove array items) so a pending
   * blur-commit from an inline field is not clobbered by a stale snapshot.
   */
  updateValue: (path: string, updater: (current: unknown) => unknown) => void;
  dirty: boolean;
  saving: boolean;
  justSaved: boolean;
  error: string;
  /** Bumps to force editable fields to re-sync after enter/discard. */
  rev: number;
  save: () => void;
  discard: () => void;
  logout: () => void;
}

const Ctx = createContext<EditModeValue | null>(null);

export function EditModeProvider({ children }: { children: ReactNode }) {
  const merged = useContent();
  const queryClient = useQueryClient();
  const update = useUpdateContent();

  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthed());
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft] = useState<SiteContent | null>(null);
  const [dirty, setDirty] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [error, setError] = useState("");
  const [rev, setRev] = useState(0);

  useEffect(() => {
    const onChange = () => setIsAdmin(isAdminAuthed());
    window.addEventListener("noviatify-auth", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("noviatify-auth", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  // Edit mode can never outlive admin status. If the token is cleared from any
  // path (toolbar logout, the /owner dashboard, another tab, or token expiry),
  // force editing off so text stops being click-to-edit immediately.
  useEffect(() => {
    if (!isAdmin && editMode) {
      setEditMode(false);
      setDraft(null);
      setDirty(false);
      setError("");
    }
  }, [isAdmin, editMode]);

  const enterEdit = useCallback(() => {
    if (!isAdmin) return;
    setDraft(structuredClone(merged));
    setDirty(false);
    setError("");
    setEditMode(true);
    setRev((r) => r + 1);
  }, [isAdmin, merged]);

  const exitEdit = useCallback(() => {
    if (dirty && !window.confirm("Discard unsaved changes?")) return;
    setEditMode(false);
    setDraft(null);
    setDirty(false);
    setError("");
  }, [dirty]);

  const getValue = useCallback(
    (path: string) => getByPath(editMode && draft ? draft : merged, path),
    [editMode, draft, merged],
  );

  const setValue = useCallback((path: string, value: unknown) => {
    setDraft((prev) => (prev ? setByPath(prev, path, value) : prev));
    setDirty(true);
    setJustSaved(false);
  }, []);

  const updateValue = useCallback(
    (path: string, updater: (current: unknown) => unknown) => {
      setDraft((prev) =>
        prev ? setByPath(prev, path, updater(getByPath(prev, path))) : prev,
      );
      setDirty(true);
      setJustSaved(false);
    },
    [],
  );

  const save = useCallback(() => {
    if (!draft) return;
    setError("");
    update.mutate(
      { data: { data: draft as unknown as Record<string, unknown> } },
      {
        onSuccess: (res) => {
          queryClient.invalidateQueries({ queryKey: getGetContentQueryKey() });
          // Reconcile the local draft with the authoritative saved document so
          // the edit view cannot drift from what is persisted.
          const stored = (res as { data?: unknown } | undefined)?.data;
          if (stored && typeof stored === "object") {
            setDraft(deepMerge(defaultContent, stored));
            setRev((r) => r + 1);
          }
          setDirty(false);
          setJustSaved(true);
          setTimeout(() => setJustSaved(false), 2500);
        },
        onError: (err) => {
          if (err instanceof ApiError && err.status === 401) {
            // clearAdminToken() dispatches the auth event itself.
            clearAdminToken();
            setEditMode(false);
            setDraft(null);
            return;
          }
          setError("Could not save. Please try again.");
        },
      },
    );
  }, [draft, queryClient, update]);

  const discard = useCallback(() => {
    setDraft(structuredClone(merged));
    setDirty(false);
    setError("");
    setRev((r) => r + 1);
  }, [merged]);

  const logout = useCallback(() => {
    clearAdminToken(); // dispatches the auth event itself
    setEditMode(false);
    setDraft(null);
    setDirty(false);
  }, []);

  const value = useMemo<EditModeValue>(
    () => ({
      isAdmin,
      editMode,
      enterEdit,
      exitEdit,
      getValue,
      setValue,
      updateValue,
      dirty,
      saving: update.isPending,
      justSaved,
      error,
      rev,
      save,
      discard,
      logout,
    }),
    [
      isAdmin,
      editMode,
      enterEdit,
      exitEdit,
      getValue,
      setValue,
      updateValue,
      dirty,
      update.isPending,
      justSaved,
      error,
      rev,
      save,
      discard,
      logout,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEditMode(): EditModeValue {
  const v = useContext(Ctx);
  if (!v) throw new Error("useEditMode must be used within EditModeProvider");
  return v;
}
