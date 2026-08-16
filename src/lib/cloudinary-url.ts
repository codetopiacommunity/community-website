/**
 * Delivery-URL helpers for Cloudinary-hosted media.
 *
 * Deliberately separate from `lib/cloudinary.ts`, which configures the
 * server-side upload SDK and must never reach a client bundle. This file is
 * pure string manipulation and is safe anywhere.
 */

const CLOUDINARY_UPLOAD_MARKER = "/image/upload/";

/**
 * Re-crops a Cloudinary image around the subject's face at the given size.
 *
 * Member portraits are uploaded at whatever dimensions and aspect ratio the
 * member happened to have -- production ranges from 800x800 to 6960x4640,
 * portrait and landscape. Letting `object-cover` crop those to a full-bleed
 * hero frame decapitates the wide ones, so the crop is asked for explicitly
 * with face gravity instead.
 *
 * Non-Cloudinary URLs (and anything unparseable) are returned untouched, so
 * a member whose picture lives elsewhere still renders -- just uncropped.
 */
export function buildPortraitUrl(
  url: string,
  { width, height }: { width: number; height: number },
): string {
  if (!url.includes(CLOUDINARY_UPLOAD_MARKER)) return url;

  // Chaining after `/upload/` is valid even when the URL already carries
  // transformations, so no need to detect and replace an existing set.
  return url.replace(
    CLOUDINARY_UPLOAD_MARKER,
    `${CLOUDINARY_UPLOAD_MARKER}c_fill,g_auto:face,w_${width},h_${height},q_auto/`,
  );
}
