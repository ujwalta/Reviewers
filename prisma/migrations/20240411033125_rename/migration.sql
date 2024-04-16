/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Contacts` table. All the data in the column will be lost.
  - You are about to drop the column `resturantId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `restaurantid` to the `Contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantid` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_resturantId_fkey";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "restaurantId",
ADD COLUMN     "restaurantid" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "resturantId",
ADD COLUMN     "restaurantid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_restaurantid_fkey" FOREIGN KEY ("restaurantid") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_restaurantid_fkey" FOREIGN KEY ("restaurantid") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
