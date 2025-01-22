-- CreateEnum
CREATE TYPE "BackgroundType" AS ENUM ('FLAT', 'GRADIENT', 'IMAGE', 'VIDEO');

-- CreateEnum
CREATE TYPE "PatternType" AS ENUM ('NONE', 'POLKA', 'STRIPE', 'WAVES', 'ZIGZAG');

-- CreateEnum
CREATE TYPE "ButtonShape" AS ENUM ('RECTANGLE', 'ROUNDED', 'CIRCULAR');

-- CreateEnum
CREATE TYPE "ShadowStyle" AS ENUM ('NONE', 'SOFT', 'HARD');

-- CreateEnum
CREATE TYPE "SpecialEffect" AS ENUM ('NONE', 'TORN', 'JIGGLY', 'FORMAL', 'FROST', 'ALTERNATING_SHAPES');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "themeId" TEXT;

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "previewUrl" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "backgroundId" TEXT NOT NULL,
    "buttonStyleId" TEXT NOT NULL,
    "fontId" TEXT NOT NULL,
    "colorsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Background" (
    "id" TEXT NOT NULL,
    "type" "BackgroundType" NOT NULL,
    "color" TEXT,
    "gradient" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "pattern" "PatternType",

    CONSTRAINT "Background_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ButtonStyle" (
    "id" TEXT NOT NULL,
    "shape" "ButtonShape" NOT NULL,
    "shadow" "ShadowStyle",
    "specialEffect" "SpecialEffect",
    "buttonColor" TEXT,
    "fontColor" TEXT,
    "shadowColor" TEXT,

    CONSTRAINT "ButtonStyle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Font" (
    "id" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "Font_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThemeColors" (
    "id" TEXT NOT NULL,
    "primary" TEXT NOT NULL,
    "secondary" TEXT,
    "accent" TEXT,
    "background" TEXT,
    "text" TEXT,

    CONSTRAINT "ThemeColors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Background"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_buttonStyleId_fkey" FOREIGN KEY ("buttonStyleId") REFERENCES "ButtonStyle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_fontId_fkey" FOREIGN KEY ("fontId") REFERENCES "Font"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "ThemeColors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
