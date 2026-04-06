import cloudinary from "@/lib/cloudinary";

/**
 * Uploads an image to Cloudinary and returns the secure URL
 */
export async function processImage(
  base64Str: string | null,
  name: string,
): Promise<string | null> {
  if (!base64Str) return null;
  // If no base64 prefix, it means it's an already saved URL or empty
  if (!base64Str.startsWith("data:image")) return base64Str;

  // Format filename using name and date to avoid collisions
  const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
  const cleanName = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const fileName = `${cleanName}-${dateStr}`;

  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Str, {
      folder: "codetopia/gallery",
      public_id: fileName,
      resource_type: "auto",
    });

    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

/**
 * Deletes an image from Cloudinary
 */
export async function deleteImage(imageUrl: string | null) {
  if (!imageUrl) return;

  try {
    const url = new URL(imageUrl);
    // Robustly check if the hostname is res.cloudinary.com
    if (url.hostname !== "res.cloudinary.com") return;

    // Extract public_id from URL
    // Pattern: .../upload/v123456789/folder/subfolder/public_id.jpg
    const parts = url.pathname.split("/");
    const fileNameWithExt = parts[parts.length - 1];
    const publicIdWithoutExt = fileNameWithExt.split(".")[0];

    // Reconstruct the full public_id with folders
    const publicId = `codetopia/gallery/${publicIdWithoutExt}`;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    // If URL is invalid or deletion fails, we log and skip
    console.error("Cloudinary Deletion Error:", error);
  }
}
