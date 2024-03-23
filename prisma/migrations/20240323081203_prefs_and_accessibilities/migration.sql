-- AlterTable
ALTER TABLE `Cinema` ADD COLUMN `audio` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `gps` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ProductionHouse` ADD COLUMN `audio` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `gps` VARCHAR(191) NULL,
    ADD COLUMN `webSite` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Prefs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `theme` VARCHAR(191) NULL,
    `images` BOOLEAN NULL,
    `audio` BOOLEAN NULL,
    `helpLevel` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CinemaAccessibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cinemaId` INTEGER NOT NULL,
    `accessibilityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductionHousesAccessibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productionHouseId` INTEGER NOT NULL,
    `accessibilityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accessibility` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `audio` VARCHAR(191) NOT NULL,
    `picto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prefs` ADD CONSTRAINT `Prefs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CinemaAccessibility` ADD CONSTRAINT `CinemaAccessibility_cinemaId_fkey` FOREIGN KEY (`cinemaId`) REFERENCES `Cinema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CinemaAccessibility` ADD CONSTRAINT `CinemaAccessibility_accessibilityId_fkey` FOREIGN KEY (`accessibilityId`) REFERENCES `Accessibility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionHousesAccessibility` ADD CONSTRAINT `ProductionHousesAccessibility_productionHouseId_fkey` FOREIGN KEY (`productionHouseId`) REFERENCES `ProductionHouse`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductionHousesAccessibility` ADD CONSTRAINT `ProductionHousesAccessibility_accessibilityId_fkey` FOREIGN KEY (`accessibilityId`) REFERENCES `Accessibility`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
