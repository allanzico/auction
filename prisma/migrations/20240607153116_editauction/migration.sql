/*
  Warnings:

  - You are about to drop the column `price` on the `Lot` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Auction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startingBid` to the `Lot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auction" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Lot" DROP COLUMN "price",
ADD COLUMN     "startingBid" DOUBLE PRECISION NOT NULL;
