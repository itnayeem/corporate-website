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
  className = "",
  alt,
}: {
  className?: string;
  alt?: string;
}) {
  const brand = useContent().site.brand;
  const src = resolveAssetUrl(brand.logoUrl);

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? brand.name}
        className={className}
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none whitespace-nowrap ${className}`}>
      <div className="relative flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-sm shadow-blue-500/30">
        <div className="w-full h-full bg-slate-900 dark:bg-[#060d2b] rounded-[6.5px] flex items-center justify-center">
          <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
      </div>
      <div className="flex items-center text-lg sm:text-xl font-extrabold tracking-tight leading-none">
        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mr-1">
          IT
        </span>
        <span className="text-slate-900 dark:text-white font-black tracking-wide">
          NAYEEM
        </span>
      </div>
    </div>
  );
}

