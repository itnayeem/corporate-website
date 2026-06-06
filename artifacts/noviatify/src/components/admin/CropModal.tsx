import { useCallback, useEffect, useRef, useState } from "react";
import ReactCrop, {
  type Crop,
  type PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Check, X } from "lucide-react";

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

function centeredAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

async function cropToFile(
  image: HTMLImageElement,
  area: PixelCrop,
  fileName: string,
  maxOutput: number,
): Promise<File> {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const srcW = area.width * scaleX;
  const srcH = area.height * scaleY;
  const srcX = area.x * scaleX;
  const srcY = area.y * scaleY;

  const scale = Math.min(1, maxOutput / Math.max(srcW, srcH));
  const outW = Math.max(1, Math.round(srcW * scale));
  const outH = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas context");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, outW, outH);

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
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState(aspectOptions[0]?.value ?? 1);
  const [busy, setBusy] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
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
    setCrop(undefined);
    setCompletedCrop(null);
    setAspect(aspectOptions[0]?.value ?? 1);
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(centeredAspectCrop(width, height, aspect));
    },
    [aspect],
  );

  const changeAspect = (value: number) => {
    setAspect(value);
    const img = imgRef.current;
    if (img) {
      setCrop(centeredAspectCrop(img.width, img.height, value));
    }
  };

  const handleConfirm = async () => {
    if (!file || !completedCrop || !imgRef.current) return;
    if (completedCrop.width === 0 || completedCrop.height === 0) return;
    setBusy(true);
    try {
      const cropped = await cropToFile(
        imgRef.current,
        completedCrop,
        file.name,
        maxOutput,
      );
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

        <div className="flex items-center justify-center max-h-80 overflow-hidden bg-[#060d2b] p-3">
          {src && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              keepSelection
              className="max-h-[18rem]"
            >
              <img
                ref={imgRef}
                src={src}
                alt="To crop"
                onLoad={onImageLoad}
                className="max-h-[18rem] max-w-full w-auto h-auto object-contain select-none"
              />
            </ReactCrop>
          )}
        </div>

        <div className="px-5 py-4 space-y-4">
          <p className="text-xs text-white/40">
            Drag the box to move it, or drag a corner to resize the area you
            want to keep.
          </p>

          {aspectOptions.length > 1 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/50">Shape</span>
              <div className="flex gap-1.5">
                {aspectOptions.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => changeAspect(opt.value)}
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
              disabled={
                busy ||
                !completedCrop ||
                completedCrop.width <= 0 ||
                completedCrop.height <= 0
              }
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
