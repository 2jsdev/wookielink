/*
  Warnings:

  - A unique constraint covering the columns `[shortCode]` on the table `links` will be added. If there are existing duplicate values, this will fail.
  - Made the column `layout` on table `links` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "links" ADD COLUMN     "shortCode" TEXT,
ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "layout" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "links_shortCode_key" ON "links"("shortCode");
