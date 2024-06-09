/*
  Warnings:

  - You are about to drop the column `timeStart` on the `activity` table. All the data in the column will be lost.
  - Added the required column `startTime` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity" DROP COLUMN "timeStart",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
