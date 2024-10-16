-- DropForeignKey
ALTER TABLE `advertisements` DROP FOREIGN KEY `Advertisements_companyId_fkey`;

-- AddForeignKey
ALTER TABLE `Advertisements` ADD CONSTRAINT `Advertisements_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
