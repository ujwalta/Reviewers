/*
  Warnings:

  - You are about to drop the column `restaurantid` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_restaurantid_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_restaurantid_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "restaurantid",
ADD COLUMN     "restaurantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Contacts";

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
