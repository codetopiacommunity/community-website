-- AlterTable - Add cover_image and flyer_image columns if they don't exist
ALTER TABLE "mentorships" ADD COLUMN IF NOT EXISTS "cover_image" TEXT,
ADD COLUMN IF NOT EXISTS "flyer_image" TEXT;

