-- CreateTable
CREATE TABLE `DashboardPinnedItem` (
    `id` VARCHAR(191) NOT NULL,
    `dashboardConfigId` VARCHAR(191) NOT NULL,
    `typeId` VARCHAR(191) NOT NULL,
    `type` ENUM('SAS', 'APP_MODULE', 'DEPLOYMENT_UNIT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DashboardPinnedItem` ADD CONSTRAINT `DashboardPinnedItem_dashboardConfigId_fkey` FOREIGN KEY (`dashboardConfigId`) REFERENCES `DashboardConfig`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
