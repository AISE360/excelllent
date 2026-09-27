import imageCompression from "browser-image-compression";

/**
 * Compress any uploaded image to .webp (max 1600px, ~0.8MB)
 * so every admin upload is automatically optimised.
 */
export async function toWebp(file: File): Promise<File> {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: 1600,
    maxSizeMB: 0.8,
    fileType: "image/webp",
    useWebWorker: true,
  });
  const base = file.name.replace(/\.[a-z0-9]+$/i, "");
  return new File([compressed], `${base}.webp`, { type: "image/webp" });
}
