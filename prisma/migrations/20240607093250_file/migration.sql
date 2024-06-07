/*
  Warnings:

  - Added the required column `file` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "file" TEXT NOT NULL;
