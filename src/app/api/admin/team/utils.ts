import fs from "node:fs";
import path from "node:path";

export async function processImage(
  base64Str: string | null,
  name: string,
): Promise<string | null> {
  if (!base64Str) return null;
  // If no base64 prefix, it means it's an already saved URL or empty
  if (!base64Str.startsWith("data:image")) return base64Str;

  const matches = base64Str.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string format");
  }

  // Common extensions extraction (jpeg -> jpg)
  let extension = matches[1].split("/")[0];
  if (extension === "jpeg") extension = "jpg";

  const buffer = Buffer.from(matches[2], "base64");

  // Format date to be safe for filenames
  const dateStr = new Date().toISOString().replace(/[:.]/g, "-");

  // Format filename using member name and date
  const cleanName = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-");
  const fileName = `${cleanName}-${dateStr}.${extension}`;

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "team-members-images",
  );

  // Create directory if it doesn't exist
  await fs.promises.mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, fileName);
  await fs.promises.writeFile(filePath, buffer);

  // Return the public URL
  return `/uploads/team-members-images/${fileName}`;
}

export async function deleteImage(imageUrl: string | null) {
  if (!imageUrl) return;
  // Ensure we are only deleting files within the local designated uploads directory
  if (imageUrl.startsWith("/uploads/team-members-images/")) {
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      const filePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "team-members-images",
        fileName,
      );
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error("Warning: Failed to delete physical image file:", err);
      }
    }
  }
}
