import cloudinary from "@/lib/cloudinary";

export async function uploadSpotlightImage(
  base64Str: string,
  name: string,
): Promise<string> {
  if (!base64Str.startsWith("data:image")) return base64Str;

  const dateStr = new Date().toISOString().replace(/[:.]/g, "-");
  const cleanName = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "-");

  const result = await cloudinary.uploader.upload(base64Str, {
    folder: "codetopia/spotlight",
    public_id: `${cleanName}-${dateStr}`,
    resource_type: "auto",
  });

  return result.secure_url;
}

export async function deleteSpotlightImage(imageUrl: string | null) {
  if (!imageUrl) return;
  try {
    const url = new URL(imageUrl);
    if (url.hostname !== "res.cloudinary.com") return;
    const parts = url.pathname.split("/");
    const publicIdWithoutExt = parts[parts.length - 1].split(".")[0];
    await cloudinary.uploader.destroy(`codetopia/spotlight/${publicIdWithoutExt}`);
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
  }
}
