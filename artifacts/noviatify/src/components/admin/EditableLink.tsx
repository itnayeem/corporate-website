import { useState, type ReactNode } from "react";
import { Link } from "wouter";
import { Link2 } from "lucide-react";
import { useEditMode } from "@/content/EditModeContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface EditableLinkProps {
  /** Absolute dot-path into the content document holding the href string. */
  path: string;
  children: ReactNode;
  className?: string;
  /** Render as a full-width block (for w-full buttons / card links). */
  block?: boolean;
}

/**
 * Classify an href and produce the URL to actually navigate to.
 *
 * External (rendered as a native <a target="_blank">) when it:
 *  - has an explicit scheme (http:, https:, mailto:, tel:, ...), or
 *  - is protocol-relative (//host), or
 *  - looks like a bare domain / subdomain (e.g. "example.com",
 *    "sub.example.com", "www.example.com/path") typed without a scheme —
 *    these get "https://" prepended so the router doesn't treat them as an
 *    in-app route and prefix them with "/".
 *
 * Internal (rendered via the wouter <Link>) when it starts with "/" or "#",
 * or is a plain word with no dot.
 */
function resolveHref(href: string): { external: boolean; url: string } {
  const trimmed = href.trim();
  if (!trimmed) return { external: false, url: "" };
  // Explicit scheme or protocol-relative — already a full external URL.
  if (/^([a-z][a-z0-9+.-]*:|\/\/)/i.test(trimmed)) {
    return { external: true, url: trimmed };
  }
  // Internal path or in-page anchor.
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    return { external: false, url: trimmed };
  }
  // Bare domain / subdomain (has a dot before any slash, no whitespace).
  if (/^[^\s/?#]+\.[^\s/?#]+/.test(trimmed)) {
    return { external: true, url: `https://${trimmed}` };
  }
  return { external: false, url: trimmed };
}

/**
 * Wraps a link/button so that, in admin edit mode, its destination URL can be
 * changed in place (WordPress/Elementor style) via a small link handle that
 * opens a URL popover. Outside edit mode it renders a normal wouter <Link>.
 */
export function EditableLink({ path, children, className, block }: EditableLinkProps) {
  const { editMode, getValue, setValue } = useEditMode();
  const raw = getValue(path);
  const href = typeof raw === "string" ? raw : raw == null ? "" : String(raw);
  const [open, setOpen] = useState(false);

  if (!editMode) {
    const { external, url } = resolveHref(href);
    if (external) {
      return (
        <a href={url} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={url || "#"} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <span className={`nv-linkedit${block ? " nv-linkedit-block" : ""}`}>
      {/* Body: blocks navigation while editing; text inside stays editable. */}
      <span
        className={`nv-linkedit-body${block ? " nv-linkedit-body-block" : ""} ${className ?? ""}`}
        onClickCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="nv-linkedit-handle"
            title="Edit link destination"
            aria-label="Edit link destination"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Link2 className="w-3 h-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={8} className="w-72 space-y-2">
          <div className="text-xs font-semibold">Link destination</div>
          <Input
            autoFocus
            value={href}
            onChange={(e) => setValue(path, e.target.value)}
            placeholder="/services, example.com, or https://sub.example.com"
          />
          <p className="text-[11px] text-muted-foreground leading-snug">
            Use a path like <code>/services</code> for an internal page. For another
            site, type a domain like <code>example.com</code> or{" "}
            <code>sub.example.com</code> (or a full <code>https://</code> URL) and it
            opens in a new tab.
          </p>
        </PopoverContent>
      </Popover>
    </span>
  );
}
