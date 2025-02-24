/*
  Warnings:

  - The values [FLAT,GRADIENT] on the enum `BackgroundType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `gradient` on the `Background` table. All the data in the column will be lost.
  - You are about to drop the column `pattern` on the `Background` table. All the data in the column will be lost.
  - You are about to drop the column `buttonColor` on the `ButtonStyle` table. All the data in the column will be lost.
  - You are about to drop the column `fontColor` on the `ButtonStyle` table. All the data in the column will be lost.
  - You are about to drop the column `shadow` on the `ButtonStyle` table. All the data in the column will be lost.
  - You are about to drop the column `shape` on the `ButtonStyle` table. All the data in the column will be lost.
  - You are about to drop the column `specialEffect` on the `ButtonStyle` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `activities` table. All the data in the column will be lost.
  - You are about to drop the `Font` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThemeColors` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `color` on table `Background` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `backgroundColor` to the `ButtonStyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `textColor` to the `ButtonStyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ButtonStyle` table without a default value. This is not possible if the table is not empty.
  - Made the column `shadowColor` on table `ButtonStyle` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ip` to the `activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAgent` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BackgroundStyleType" AS ENUM ('FLAT', 'COLORUP', 'COLORDOWN', 'POLKA', 'STRIPE', 'WAVES', 'ZIGZAG');

-- CreateEnum
CREATE TYPE "ButtonType" AS ENUM ('FILL', 'FILL_ROUNDED', 'FILL_CIRCULAR', 'OUTLINE', 'OUTLINE_ROUNDED', 'OUTLINE_CIRCULAR', 'SOFTSHADOW', 'SOFTSHADOW_ROUNDED', 'SOFTSHADOW_CIRCULAR', 'HARDSHADOW', 'HARDSHADOW_ROUNDED', 'HARDSHADOW_CIRCULAR');

-- CreateEnum
CREATE TYPE "FontFamily" AS ENUM ('inter', 'roboto', 'montserrat', 'poppins', 'overpass_mono');

-- AlterEnum
BEGIN;
CREATE TYPE "BackgroundType_new" AS ENUM ('COLOR', 'IMAGE', 'VIDEO', 'ANIMATED');
ALTER TABLE "Background" ALTER COLUMN "type" TYPE "BackgroundType_new" USING ("type"::text::"BackgroundType_new");
ALTER TYPE "BackgroundType" RENAME TO "BackgroundType_old";
ALTER TYPE "BackgroundType_new" RENAME TO "BackgroundType";
DROP TYPE "BackgroundType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_backgroundId_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_buttonStyleId_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_colorsId_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_fontId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_themeId_fkey";

-- AlterTable
ALTER TABLE "Background" DROP COLUMN "gradient",
DROP COLUMN "pattern",
ADD COLUMN     "style" "BackgroundStyleType",
ALTER COLUMN "color" SET NOT NULL;

-- AlterTable
ALTER TABLE "ButtonStyle" DROP COLUMN "buttonColor",
DROP COLUMN "fontColor",
DROP COLUMN "shadow",
DROP COLUMN "shape",
DROP COLUMN "specialEffect",
ADD COLUMN     "backgroundColor" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL,
ADD COLUMN     "type" "ButtonType" NOT NULL,
ALTER COLUMN "shadowColor" SET NOT NULL;

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "metadata",
ADD COLUMN     "browser" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "loc" TEXT,
ADD COLUMN     "org" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "screen" TEXT,
ADD COLUMN     "timezone" TEXT,
ADD COLUMN     "userAgent" TEXT NOT NULL;

-- DropTable
DROP TABLE "Font";

-- DropTable
DROP TABLE "Theme";

-- DropTable
DROP TABLE "ThemeColors";

-- DropEnum
DROP TYPE "ButtonShape";

-- DropEnum
DROP TYPE "PatternType";

-- DropEnum
DROP TYPE "ShadowStyle";

-- DropEnum
DROP TYPE "SpecialEffect";

-- CreateTable
CREATE TABLE "themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "isCustom" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT,
    "backgroundId" TEXT NOT NULL,
    "buttonStyleId" TEXT NOT NULL,
    "fontStyleId" TEXT NOT NULL,

    CONSTRAINT "themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FontStyle" (
    "id" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "fontFamily" "FontFamily" NOT NULL,

    CONSTRAINT "FontStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "themes_backgroundId_key" ON "themes"("backgroundId");

-- CreateIndex
CREATE UNIQUE INDEX "themes_buttonStyleId_key" ON "themes"("buttonStyleId");

-- CreateIndex
CREATE UNIQUE INDEX "themes_fontStyleId_key" ON "themes"("fontStyleId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "themes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Background"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_buttonStyleId_fkey" FOREIGN KEY ("buttonStyleId") REFERENCES "ButtonStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "themes" ADD CONSTRAINT "themes_fontStyleId_fkey" FOREIGN KEY ("fontStyleId") REFERENCES "FontStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
