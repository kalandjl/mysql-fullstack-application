-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_userPreferenceId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `userPreferenceId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userPreferenceId_fkey` FOREIGN KEY (`userPreferenceId`) REFERENCES `UserPreference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
