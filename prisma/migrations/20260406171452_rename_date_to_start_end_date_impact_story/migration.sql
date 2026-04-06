/*
  Warnings:

  - You are about to drop the column `date` on the `impact_stories` table. All the data in the column will be lost.
  - Added the required column `start_date` to the `impact_stories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "impact_stories" DROP COLUMN "date",
ADD COLUMN     "end_date" TEXT,
ADD COLUMN     "start_date" TEXT NOT NULL;
