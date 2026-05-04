import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn("CLOUDINARY_CLOUD_NAME is not set. Image uploads will fail.");
}

if (!process.env.CLOUDINARY_API_KEY) {
  console.warn("CLOUDINARY_API_KEY is not set. Image uploads will fail.");
}

if (!process.env.CLOUDINARY_API_SECRET) {
  console.warn("CLOUDINARY_API_SECRET is not set. Image uploads will fail.");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
