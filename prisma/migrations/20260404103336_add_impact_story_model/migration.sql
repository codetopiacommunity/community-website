-- CreateTable
CREATE TABLE "impact_stories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "impact" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "link" TEXT,
    "gallery_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "impact_stories_pkey" PRIMARY KEY ("id")
);
