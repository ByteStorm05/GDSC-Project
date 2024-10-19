/*
  Warnings:

  - You are about to drop the column `stockId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the `Stock` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `stockName` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_stockId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "stockId",
ADD COLUMN     "stockName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Stock";
