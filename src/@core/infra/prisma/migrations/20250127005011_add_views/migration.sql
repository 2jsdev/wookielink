-- AlterTable
ALTER TABLE "link_interactions" ADD COLUMN     "loc" TEXT,
ADD COLUMN     "org" TEXT,
ADD COLUMN     "timezone" TEXT;

-- AlterTable
ALTER TABLE "page_views" ADD COLUMN     "loc" TEXT,
ADD COLUMN     "org" TEXT,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "timezone" TEXT;
