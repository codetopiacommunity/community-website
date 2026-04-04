-- CreateTable
CREATE TABLE "articles_config" (
    "id" SERIAL NOT NULL,
    "hashnode_host" TEXT NOT NULL,
    "featured_slugs" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_config_pkey" PRIMARY KEY ("id")
);
