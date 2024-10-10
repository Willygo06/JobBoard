/*
  Warnings:

  - You are about to drop the column `companyId` on the `People` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `People` DROP FOREIGN KEY `People_companyId_fkey`;

-- AlterTable
ALTER TABLE `People` DROP COLUMN `companyId`;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobId` INTEGER NOT NULL,
    `applicantId` INTEGER NOT NULL,
    `applicationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AdvertisementsToCompany` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdvertisementsToCompany_AB_unique`(`A`, `B`),
    INDEX `_AdvertisementsToCompany_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Advertisements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `People`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdvertisementsToCompany` ADD CONSTRAINT `_AdvertisementsToCompany_A_fkey` FOREIGN KEY (`A`) REFERENCES `Advertisements`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdvertisementsToCompany` ADD CONSTRAINT `_AdvertisementsToCompany_B_fkey` FOREIGN KEY (`B`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
