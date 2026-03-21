/*
  Warnings:

  - A unique constraint covering the columns `[verification_token]` on the table `subscribers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "subscribers" ADD COLUMN     "token_expires_at" TIMESTAMP(3),
ADD COLUMN     "verification_token" TEXT,
ADD COLUMN     "verified_at" TIMESTAMP(3),
ALTER COLUMN "status" SET DEFAULT 'pending';

-- CreateIndex
CREATE UNIQUE INDEX "subscribers_verification_token_key" ON "subscribers"("verification_token");
