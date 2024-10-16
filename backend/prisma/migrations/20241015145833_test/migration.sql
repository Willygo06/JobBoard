/*
  Warnings:

  - Made the column `jobId` on table `application` required. This step will fail if there are existing NULL values in that column.
  - Made the column `applicantId` on table `application` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_applicantId_fkey`;

-- DropForeignKey
ALTER TABLE `application` DROP FOREIGN KEY `Application_jobId_fkey`;

-- AlterTable
ALTER TABLE `application` MODIFY `jobId` INTEGER NOT NULL,
    MODIFY `applicantId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `Advertisements`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_applicantId_fkey` FOREIGN KEY (`applicantId`) REFERENCES `People`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
