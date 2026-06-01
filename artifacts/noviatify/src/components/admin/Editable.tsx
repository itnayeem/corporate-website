import { type CSSProperties, type ElementType, type ReactNode } from "react";
import { useEditMode } from "@/content/EditModeContext";

interface EditableProps {
  /** Absolute dot-path into the content document, e.g. "home.hero.title". */
  path: string;
  /** Element to render. Defaults to a span. */
  as?: ElementType;
  className?: string;
  /** Inline styles forwarded to the rendered element (e.g. fontFamily). */
  style?: CSSProperties;
  /** Allow line breaks (renders as a multi-line editable region). */
  multiline?: boolean;
  /** Fallback rendered only when the value is empty and not editing. */
  children?: ReactNode;
}

/**
 * Renders a piece of site text. When an admin enters edit mode, the text
 * becomes click-to-edit in place (WordPress/Elementor style) and commits the
 * new value into the draft on blur.
 */
export function Editable({ path, as, className, style, multiline, children }: EditableProps) {
  const { editMode, getValue, setValue, rev } = useEditMode();
  const raw = getValue(path);
  const text = typeof raw === "string" ? raw : raw == null ? "" : String(raw);
  const Tag = (as ?? "span") as ElementType;

  if (!editMode) {
    if (text === "" && children != null) {
      return <Tag className={className} style={style}>{children}</Tag>;
    }
    return <Tag className={className} style={style}>{text}</Tag>;
  }

  return (
    <Tag
      key={`${path}:${rev}`}
      className={`${className ?? ""} nv-editable`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      data-nv-path={path}
      title="Click to edit"
      role="textbox"
      tabIndex={0}
      onMouseDownCapture={(e: React.MouseEvent) => e.stopPropagation()}
      onClickCapture={(e: React.MouseEvent) => {
        // Prevent the surrounding link/button from activating while editing.
        e.preventDefault();
        e.stopPropagation();
      }}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
        e.stopPropagation();
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = multiline
          ? e.currentTarget.innerText
          : e.currentTarget.textContent ?? "";
        if (next !== text) setValue(path, next);
      }}
    >
      {text}
    </Tag>
  );
}
