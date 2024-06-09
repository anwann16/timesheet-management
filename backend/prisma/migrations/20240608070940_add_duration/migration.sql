/*
  Warnings:

  - Added the required column `duration` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity" ADD COLUMN     "duration" TEXT NOT NULL;
