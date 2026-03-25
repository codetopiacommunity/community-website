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

  // Whitelist allowed extensions for security
  const allowedExtensions = ["jpg", "jpeg", "png", "webp", "gif", "svg", "svg+xml"];
  const rawSubtype = matches[1].toLowerCase();
  
  // Extract subtype if it's like "image/png" or just use the raw subtype from our regex capture
  let extension = rawSubtype.split("/")[0];
  
  if (!allowedExtensions.includes(extension)) {
    throw new Error("Unsupported image format");
  }

  if (extension === "jpeg") extension = "jpg";
  if (extension === "svg+xml") extension = "svg";

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

  const filePath = path.join(uploadDir, path.basename(fileName));
  
  // Security check: ensure the resulting path is actually within the uploads directory
  if (!filePath.startsWith(uploadDir)) {
    throw new Error("Invalid file path attempted for upload");
  }

  await fs.promises.writeFile(filePath, buffer);

  // Return the public URL
  return `/uploads/team-members-images/${fileName}`;
}

export async function deleteImage(imageUrl: string | null) {
  if (!imageUrl) return;
  // Ensure we are only deleting files within the local designated uploads directory
  if (imageUrl.startsWith("/uploads/team-members-images/")) {
    const fileName = path.basename(imageUrl);
    if (fileName) {
      const targetDir = path.join(process.cwd(), "public", "uploads", "team-members-images");
      const filePath = path.join(targetDir, fileName);
      
      // Ensure the canonicalized path is within the target directory
      if (!filePath.startsWith(targetDir)) {
          return;
      }
      
      try {
        await fs.promises.unlink(filePath);
      } catch (err) {
        console.error("Warning: Failed to delete physical image file:", err);
      }
    }
  }
}
