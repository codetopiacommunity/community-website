-- CreateTable
CREATE TABLE "spotlights" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "links" JSONB NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spotlights_pkey" PRIMARY KEY ("id")
);
