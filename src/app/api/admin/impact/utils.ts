import cloudinary from "@/lib/cloudinary";

export async function processImage(
  base64Str: string | null,
  name: string,
  folder: "images" | "logos",
): Promise<string | null> {
  if (!base64Str) return null;
  if (!base64Str.startsWith("data:image")) return base64Str;

  const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
  const cleanName = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const fileName = `${cleanName}-${folder}-${dateStr}`;

  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Str, {
      folder: `codetopia/impact/${folder}`,
      public_id: fileName,
      resource_type: "auto",
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
}

export async function deleteImage(
  imageUrl: string | null,
  folder: "images" | "logos",
) {
  if (!imageUrl) return;
  try {
    const url = new URL(imageUrl);
    if (url.hostname !== "res.cloudinary.com") return;
    const parts = url.pathname.split("/");
    const publicIdWithoutExt = parts[parts.length - 1].split(".")[0];
    await cloudinary.uploader.destroy(
      `codetopia/impact/${folder}/${publicIdWithoutExt}`,
    );
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
  }
}
