-- CreateTable
CREATE TABLE "recognitions" (
    "id" SERIAL NOT NULL,
    "portal_username" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'MEMBER',
    "award_name" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "impact_summary" TEXT NOT NULL,
    "role_label" TEXT,
    "achievements" TEXT[],
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recognitions_pkey" PRIMARY KEY ("id")
);
