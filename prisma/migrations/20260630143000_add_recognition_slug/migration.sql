-- AlterTable
ALTER TABLE "recognitions" ADD COLUMN "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "recognitions_slug_key" ON "recognitions"("slug");
