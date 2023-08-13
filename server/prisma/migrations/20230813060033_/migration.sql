/*
  Warnings:

  - Made the column `userPreferenceId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userPreferenceId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `userPreferenceId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userPreferenceId_fkey` FOREIGN KEY (`userPreferenceId`) REFERENCES `UserPreference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
