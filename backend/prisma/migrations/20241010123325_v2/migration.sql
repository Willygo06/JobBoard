/*
  Warnings:

  - Added the required column `benefits` to the `Advertisements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Advertisements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Advertisements` ADD COLUMN `benefits` VARCHAR(191) NOT NULL,
    ADD COLUMN `hours` VARCHAR(191) NOT NULL;
