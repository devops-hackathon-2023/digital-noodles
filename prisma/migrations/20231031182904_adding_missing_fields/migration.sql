-- AlterTable
ALTER TABLE `Account` ADD COLUMN `id_token_expires_in` INTEGER NULL,
    ADD COLUMN `refresh_token_expires_in` INTEGER NULL;
