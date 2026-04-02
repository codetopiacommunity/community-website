-- CreateTable
CREATE TABLE "gallery_albums" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_photos" (
    "id" SERIAL NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "album_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gallery_albums_slug_key" ON "gallery_albums"("slug");

-- AddForeignKey
ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "gallery_albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;
