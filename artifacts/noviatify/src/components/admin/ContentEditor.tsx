type Json = unknown;

function humanize(key: string): string {
  if (key.startsWith("/")) return key;
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

function blankFrom(sample: Json): Json {
  if (Array.isArray(sample)) return sample.length > 0 ? blankFrom(sample[0]) : "";
  if (sample && typeof sample === "object") {
    const out: Record<string, Json> = {};
    for (const k of Object.keys(sample as Record<string, Json>)) {
      out[k] = blankFrom((sample as Record<string, Json>)[k]);
    }
    return out;
  }
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  return "";
}

const inputClass =
  "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition";

interface NodeProps {
  value: Json;
  label: string;
  onChange: (next: Json) => void;
  depth: number;
}

function Node({ value, label, onChange, depth }: NodeProps) {
  if (typeof value === "string") {
    const multiline = value.length > 55 || value.includes("\n");
    return (
      <label className="block mb-4">
        <span className="block text-xs font-semibold uppercase tracking-wide text-white/45 mb-1.5">
          {label}
        </span>
        {multiline ? (
          <textarea
            className={inputClass}
            rows={Math.min(8, Math.max(2, Math.ceil(value.length / 60)))}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            className={inputClass}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block mb-4">
        <span className="block text-xs font-semibold uppercase tracking-wide text-white/45 mb-1.5">
          {label}
        </span>
        <input
          type="number"
          className={inputClass}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="flex items-center gap-2 mb-4 cursor-pointer">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-white/20 bg-white/5"
        />
        <span className="text-sm text-white/80">{label}</span>
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className="mb-5 border-l-2 border-primary/40 pl-4">
        <div className="text-sm font-bold text-white mb-3">{label}</div>
        {value.map((item, i) => (
          <div
            key={i}
            className="mb-3 rounded-xl bg-white/[0.03] border border-white/5 p-3"
          >
            <Node
              value={item}
              label={`${humanize(label)} #${i + 1}`}
              depth={depth + 1}
              onChange={(next) => {
                const arr = [...value];
                arr[i] = next;
                onChange(arr);
              }}
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, j) => j !== i))}
              className="text-xs font-medium text-red-400 hover:text-red-300 transition"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, blankFrom(value[0] ?? "")])}
          className="text-xs font-semibold text-primary hover:text-blue-400 transition"
        >
          + Add item
        </button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const obj = value as Record<string, Json>;
    return (
      <div className={depth === 0 ? "" : "mb-5 border-l border-white/10 pl-4"}>
        {depth > 0 && (
          <div className="text-sm font-bold text-white mb-3">{label}</div>
        )}
        {Object.keys(obj).map((k) => (
          <Node
            key={k}
            value={obj[k]}
            label={humanize(k)}
            depth={depth + 1}
            onChange={(next) => onChange({ ...obj, [k]: next })}
          />
        ))}
      </div>
    );
  }

  return null;
}

export function ContentEditor({
  value,
  onChange,
}: {
  value: Json;
  onChange: (next: Json) => void;
}) {
  return <Node value={value} label="Content" depth={0} onChange={onChange} />;
}
