/*
  Warnings:

  - Added the required column `amount` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lotId` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bid" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lotId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_lotId_fkey" FOREIGN KEY ("lotId") REFERENCES "Lot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
