/*
  Warnings:

  - You are about to drop the column `resturantId` on the `Contacts` table. All the data in the column will be lost.
  - Added the required column `restaurantId` to the `Contacts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_resturantId_fkey";

-- AlterTable
ALTER TABLE "Contacts" DROP COLUMN "resturantId",
ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Contacts" ADD CONSTRAINT "Contacts_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
