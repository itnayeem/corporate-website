import { useEffect } from "react";
import { useContent } from "@/content/ContentContext";
import { resolveAssetUrl } from "./SiteLogo";

const DEFAULT_FAVICON = `${import.meta.env.BASE_URL}favicon.svg`;

/**
 * Syncs the document <title> and favicon with the admin-editable brand settings.
 * Renders nothing.
 */
export default function BrandHead() {
  const brand = useContent().site.brand;

  useEffect(() => {
    if (brand.name) document.title = brand.name;
  }, [brand.name]);

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const favicon = resolveAssetUrl(brand.faviconUrl);
    if (favicon) {
      // Uploaded favicons can be any image type; let the browser infer it.
      link.removeAttribute("type");
      link.href = favicon;
    } else {
      // Cleared back to the bundled default so the tab icon stays in sync.
      link.type = "image/svg+xml";
      link.href = DEFAULT_FAVICON;
    }
  }, [brand.faviconUrl]);

  return null;
}
