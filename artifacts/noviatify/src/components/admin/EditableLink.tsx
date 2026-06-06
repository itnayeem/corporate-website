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
 * An href is "external" if it uses an explicit scheme (http, https, mailto,
 * tel, etc.) or is protocol-relative (//host). Those must use a native <a> so
 * the client-side router doesn't try to navigate to them as in-app routes.
 */
function isExternalHref(href: string): boolean {
  return /^([a-z][a-z0-9+.-]*:|\/\/)/i.test(href.trim());
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
    if (href && isExternalHref(href)) {
      return (
        <a href={href} className={className} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href || "#"} className={className}>
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
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
            placeholder="/services or https://example.com"
          />
          <p className="text-[11px] text-muted-foreground leading-snug">
            Use a path like <code>/services</code> for an internal page, or a full{" "}
            <code>https://</code> URL for an external site.
          </p>
        </PopoverContent>
      </Popover>
    </span>
  );
}
