/*
  Warnings:

  - Added the required column `categoryId` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lot" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "LotCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "LotCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lot" ADD CONSTRAINT "Lot_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LotCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
