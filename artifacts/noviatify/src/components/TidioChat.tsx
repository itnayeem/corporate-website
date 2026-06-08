import { useEffect } from "react";
import { useContent } from "@/content/ContentContext";

const SCRIPT_ID = "tidio-chat-script";

/**
 * Loads the Tidio live-chat widget when an admin-editable public key is set
 * (site.brand.tidioKey). Renders nothing.
 *
 * Note: once Tidio has loaded, the floating widget persists for the rest of
 * the page session. Changing or clearing the key takes full effect after a
 * page refresh.
 */
export default function TidioChat() {
  const tidioKey = useContent().site.brand.tidioKey ?? "";

  useEffect(() => {
    const key = tidioKey.trim();
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (!key) {
      if (existing) existing.remove();
      return;
    }

    // Already loaded for this key — nothing to do.
    if (existing && existing.src.includes(`/${key}.js`)) return;
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://code.tidio.co/${key}.js`;
    script.async = true;
    document.body.appendChild(script);
  }, [tidioKey]);

  return null;
}
