/*
  Warnings:

  - You are about to drop the `_AdvertisementsToCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AdvertisementsToCompany` DROP FOREIGN KEY `_AdvertisementsToCompany_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AdvertisementsToCompany` DROP FOREIGN KEY `_AdvertisementsToCompany_B_fkey`;

-- AlterTable
ALTER TABLE `Advertisements` ADD COLUMN `companyId` INTEGER NULL;

-- DropTable
DROP TABLE `_AdvertisementsToCompany`;

-- AddForeignKey
ALTER TABLE `Advertisements` ADD CONSTRAINT `Advertisements_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
