/*
  Warnings:

  - Made the column `companyId` on table `advertisements` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `advertisements` DROP FOREIGN KEY `Advertisements_companyId_fkey`;

-- AlterTable
ALTER TABLE `advertisements` MODIFY `companyId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Advertisements` ADD CONSTRAINT `Advertisements_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
