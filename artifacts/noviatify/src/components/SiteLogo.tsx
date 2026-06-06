import logoFallback from "@assets/noviatify-logo.png";
import { useContent } from "@/content/ContentContext";

/**
 * Resolve a stored brand asset reference into a usable <img src>.
 * - Object-storage uploads are stored as `/objects/<id>` and served via `/api/storage`.
 * - Full URLs (http/https/protocol-relative) and data URIs are used as-is.
 * - Empty/undefined returns null so callers can fall back to the bundled asset.
 */
export function resolveAssetUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  if (/^(https?:)?\/\//.test(url) || url.startsWith("data:")) return url;
  if (url.startsWith("/objects/")) return `/api/storage${url}`;
  return url;
}

export default function SiteLogo({
  className,
  alt,
}: {
  className?: string;
  alt?: string;
}) {
  const brand = useContent().site.brand;
  const src = resolveAssetUrl(brand.logoUrl) ?? logoFallback;
  return (
    <img
      src={src}
      alt={alt ?? brand.name}
      className={className}
      onError={(e) => {
        // If a stored logo can't be loaded (e.g. missing file), fall back to
        // the bundled default instead of showing a broken image.
        const img = e.currentTarget;
        if (img.src !== logoFallback) img.src = logoFallback;
      }}
    />
  );
}
