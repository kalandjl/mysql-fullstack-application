/*
  Warnings:

  - You are about to alter the column `name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(22) NOT NULL DEFAULT 'password',
    MODIFY `name` VARCHAR(45) NULL;
