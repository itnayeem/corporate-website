import { useEffect, useRef, useState } from "react";
import { Camera, X, Loader2 } from "lucide-react";
import { useRequestUploadUrl } from "@workspace/api-client-react";
import { useEditMode } from "@/content/EditModeContext";
import { getAdminToken } from "@/lib/adminAuth";
import { resolveAssetUrl } from "@/components/SiteLogo";
import { Editable } from "@/components/admin/Editable";
import { CropModal } from "@/components/admin/CropModal";

/**
 * Team-member avatar. Shows the uploaded photo when present, otherwise the
 * gradient initials circle. When an admin is in edit mode, exposes controls to
 * add / change / remove the photo. The picked image is cropped square and
 * downscaled to a small JPEG (fast browsing) before upload; the resulting
 * `/objects/...` path is written into the edit draft and persists on Save.
 */
export default function MemberAvatar({
  index,
  imageUrl,
  name,
}: {
  index: number;
  imageUrl: string;
  name: string;
}) {
  const { editMode, setValue } = useEditMode();
  const requestUpload = useRequestUploadUrl();
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [cropping, setCropping] = useState<File | null>(null);
  const [broken, setBroken] = useState(false);

  const photoPath = `about.teamSection.members.${index}.imageUrl`;
  const initialsPath = `about.teamSection.members.${index}.initials`;
  const resolved = resolveAssetUrl(imageUrl);
  const photoSrc = broken ? "" : resolved;

  // A new/changed source should get a fresh chance to load.
  useEffect(() => {
    setBroken(false);
  }, [resolved]);

  // Don't let a crop modal outlive the edit session — confirming it after
  // leaving edit mode would upload a file that setValue can no longer reference.
  useEffect(() => {
    if (!editMode) setCropping(null);
  }, [editMode]);

  const uploadFile = async (file: File) => {
    if (!editMode) return;
    setError("");
    setUploading(true);
    try {
      const res = await requestUpload.mutateAsync({
        data: { name: file.name, size: file.size, contentType: file.type },
      });
      const token = getAdminToken();
      const put = await fetch(res.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: file,
      });
      if (!put.ok) throw new Error("upload failed");
      setValue(photoPath, res.objectPath);
    } catch {
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative mx-auto mb-4 w-16 h-16">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={name}
            loading="lazy"
            onError={() => setBroken(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <Editable
            as="span"
            className="text-white font-extrabold text-lg"
            path={initialsPath}
          />
        )}
      </div>

      {editMode && (
        <>
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            disabled={uploading}
            title={photoSrc ? "Change photo" : "Add photo"}
            className="absolute -bottom-1 -right-1 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white border-2 border-[#060d2b] shadow hover:bg-blue-600 transition disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Camera className="w-3.5 h-3.5" />
            )}
          </button>
          {photoSrc && !uploading && (
            <button
              type="button"
              onClick={() => setValue(photoPath, "")}
              title="Remove photo"
              className="absolute -top-1 -right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white border-2 border-[#060d2b] shadow hover:bg-red-600 transition"
            >
              <X className="w-3 h-3" />
            </button>
          )}
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setCropping(f);
              e.target.value = "";
            }}
          />
        </>
      )}

      {error && (
        <p className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-red-400">
          {error}
        </p>
      )}

      {cropping && (
        <CropModal
          file={cropping}
          title="Crop team photo"
          maxOutput={256}
          outputMime="image/jpeg"
          aspectOptions={[{ label: "Square", value: 1 }]}
          onCancel={() => setCropping(null)}
          onCropped={(cropped) => {
            setCropping(null);
            uploadFile(cropped);
          }}
        />
      )}
    </div>
  );
}
