import { useCallback, useEffect, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Check, X, ZoomIn } from "lucide-react";

type AspectOption = { label: string; value: number };

interface CropModalProps {
  file: File | null;
  title: string;
  aspectOptions: AspectOption[];
  /** Longest output edge in px; the crop is scaled down to fit. */
  maxOutput?: number;
  onCancel: () => void;
  onCropped: (file: File) => void;
}

async function cropToFile(
  src: string,
  area: Area,
  fileName: string,
  maxOutput: number,
): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

  const scale = Math.min(1, maxOutput / Math.max(area.width, area.height));
  const outW = Math.max(1, Math.round(area.width * scale));
  const outH = Math.max(1, Math.round(area.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    outW,
    outH,
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 0.92),
  );
  if (!blob) throw new Error("crop failed");
  const base = fileName.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}.png`, { type: "image/png" });
}

export function CropModal({
  file,
  title,
  aspectOptions,
  maxOutput = 512,
  onCancel,
  onCropped,
}: CropModalProps) {
  const [src, setSrc] = useState<string>("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(aspectOptions[0]?.value ?? 1);
  const [areaPixels, setAreaPixels] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;
    return () => {
      activeRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!file) {
      setSrc("");
      return;
    }
    const url = URL.createObjectURL(file);
    setSrc(url);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAreaPixels(null);
    setAspect(aspectOptions[0]?.value ?? 1);
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setAreaPixels(pixels);
  }, []);

  const handleConfirm = async () => {
    if (!file || !areaPixels) return;
    setBusy(true);
    try {
      const cropped = await cropToFile(src, areaPixels, file.name, maxOutput);
      if (activeRef.current) onCropped(cropped);
    } finally {
      if (activeRef.current) setBusy(false);
    }
  };

  if (!file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-[#0b1638] border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h3 className="text-sm font-bold text-white">{title}</h3>
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/5 transition disabled:opacity-40"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative h-72 bg-[#060d2b]">
          {src && (
            <Cropper
              image={src}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
        </div>

        <div className="px-5 py-4 space-y-4">
          {aspectOptions.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/50">Shape</span>
              <div className="flex gap-1.5">
                {aspectOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setAspect(opt.value)}
                    className={`text-xs font-semibold px-2.5 py-1 rounded-md border transition ${
                      aspect === opt.value
                        ? "bg-primary border-primary text-white"
                        : "border-white/15 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <ZoomIn className="w-4 h-4 text-white/50 flex-shrink-0" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              disabled={busy}
              className="text-xs font-semibold text-white/70 border border-white/15 px-4 py-2 rounded-lg hover:bg-white/5 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={busy || !areaPixels}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-primary px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            >
              <Check className="w-3.5 h-3.5" />
              {busy ? "Applying…" : "Crop & use"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
