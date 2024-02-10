/*
  Warnings:

  - Added the required column `address1` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Cinema` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Cinema` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cinema` ADD COLUMN `address1` VARCHAR(191) NOT NULL,
    ADD COLUMN `address2` VARCHAR(191) NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `phone` INTEGER NULL,
    ADD COLUMN `postalCode` VARCHAR(191) NOT NULL;
