-- CreateTable
CREATE TABLE `CpuUsageMock` (
    `id` VARCHAR(191) NOT NULL,
    `core1Percent` INTEGER NOT NULL,
    `core2Percent` INTEGER NOT NULL,
    `core3Percent` INTEGER NOT NULL,
    `core4Percent` INTEGER NOT NULL,
    `coreNum` INTEGER NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `cellId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiskUsageMock` (
    `id` VARCHAR(191) NOT NULL,
    `maximumCapacity` INTEGER NOT NULL,
    `usedCapacity` INTEGER NOT NULL,
    `diskIdentifier` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `cellId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BandwidthUsageMock` (
    `id` VARCHAR(191) NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `cellId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
