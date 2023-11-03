-- CreateTable
CREATE TABLE `RamUsageMock` (
    `id` VARCHAR(191) NOT NULL,
    `amountInMB` INTEGER NOT NULL,
    `time` VARCHAR(191) NOT NULL,
    `cellId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
