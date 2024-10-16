/*
  Warnings:

  - You are about to drop the column `status` on the `Application` table. All the data in the column will be lost.
  - Added the required column `state` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Application` DROP COLUMN `status`,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
