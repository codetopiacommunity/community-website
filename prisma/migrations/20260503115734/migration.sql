-- AlterTable
ALTER TABLE "careers" ADD COLUMN     "slug" TEXT,
ALTER COLUMN "responsibilities" DROP DEFAULT,
ALTER COLUMN "nice_to_have" DROP DEFAULT,
ALTER COLUMN "what_we_offer" DROP DEFAULT;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "impact_stories" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "newsletters" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "spotlights" ADD COLUMN     "slug" TEXT;
