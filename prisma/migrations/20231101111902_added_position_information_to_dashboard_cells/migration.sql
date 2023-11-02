/*
  Warnings:

  - Added the required column `h` to the `DashboardCell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `w` to the `DashboardCell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `DashboardCell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `DashboardCell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DashboardCell` ADD COLUMN `h` INTEGER NOT NULL,
    ADD COLUMN `w` INTEGER NOT NULL,
    ADD COLUMN `x` INTEGER NOT NULL,
    ADD COLUMN `y` INTEGER NOT NULL;
