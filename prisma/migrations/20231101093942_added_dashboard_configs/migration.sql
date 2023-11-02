-- CreateTable
CREATE TABLE `DashboardConfig` (
    `id` VARCHAR(191) NOT NULL,
    `dashboardType` ENUM('SAS', 'APP_MODULE', 'DEPLOYMENT_UNIT') NOT NULL,
    `env` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DashboardCell` (
    `id` VARCHAR(191) NOT NULL,
    `statId` VARCHAR(191) NULL,
    `dashboardConfigId` VARCHAR(191) NOT NULL,
    `statType` ENUM('SYSTEM_DISK_USAGE', 'SYSTEM_RAM_USAGE', 'SYSTEM_BANDWIDTH', 'SYSTEM_CPU_USAGE', 'GATE', 'HEALTHCHECK', 'STATS_AVG_BUILD_TIME', 'STATS_LAST_DEPLOYMENT_BUILD_TIME', 'STATS_GATES_FAILED_PASSED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DashboardConfig` ADD CONSTRAINT `DashboardConfig_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DashboardCell` ADD CONSTRAINT `DashboardCell_dashboardConfigId_fkey` FOREIGN KEY (`dashboardConfigId`) REFERENCES `DashboardConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
