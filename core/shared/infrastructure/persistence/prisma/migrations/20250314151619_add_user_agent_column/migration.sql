/*
  Warnings:

  - You are about to drop the column `userAgent` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "userAgent",
ADD COLUMN     "user_agent" TEXT;
