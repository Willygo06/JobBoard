-- DropForeignKey
ALTER TABLE `Application` DROP FOREIGN KEY `Application_applicantId_fkey`;

-- AlterTable
ALTER TABLE `Application` ADD COLUMN `guestEmail` VARCHAR(191) NULL,
    ADD COLUMN `guestName` VARCHAR(191) NULL,
    MODIFY `applicantId` INTEGER NULL,
    MODIFY `state` VARCHAR(191) NOT NULL DEFAULT 'en attente';

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `People`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
