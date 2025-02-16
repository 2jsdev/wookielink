-- CreateEnum
CREATE TYPE "ProfileLayout" AS ENUM ('Classic', 'Hero');

-- CreateEnum
CREATE TYPE "CollectionLayout" AS ENUM ('Stack', 'Grid', 'Carousel');

-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('Link', 'SocialIcon');

-- CreateEnum
CREATE TYPE "LinkLayout" AS ENUM ('Classic', 'Feature');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('View', 'Click');

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

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "username" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "bio" TEXT,
    "layout" "ProfileLayout" NOT NULL DEFAULT 'Classic',
    "themeId" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "collections" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "collections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" TEXT NOT NULL,
    "type" "LinkType" NOT NULL DEFAULT 'Link',
    "layout" "LinkLayout" DEFAULT 'Classic',
    "icon" TEXT,
    "thumbnail" TEXT,
    "title" TEXT,
    "url" TEXT,
    "position" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "collectionId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "prioritize" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL DEFAULT 'View',
    "user_id" TEXT NOT NULL,
    "link_id" TEXT NOT NULL,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "links_user_id_collectionId_active_idx" ON "links"("user_id", "collectionId", "active");

-- CreateIndex
CREATE INDEX "activities_link_id_timestamp_idx" ON "activities"("link_id", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_name_key" ON "Theme"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_backgroundId_fkey" FOREIGN KEY ("backgroundId") REFERENCES "Background"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_buttonStyleId_fkey" FOREIGN KEY ("buttonStyleId") REFERENCES "ButtonStyle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_colorsId_fkey" FOREIGN KEY ("colorsId") REFERENCES "ThemeColors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_fontId_fkey" FOREIGN KEY ("fontId") REFERENCES "Font"("id") ON DELETE CASCADE ON UPDATE CASCADE;
