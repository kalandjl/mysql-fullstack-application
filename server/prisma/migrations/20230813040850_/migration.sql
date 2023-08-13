/*
  Warnings:

  - You are about to drop the column `userId` on the `userpreference` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userPreferenceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userPreferenceId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userpreference` DROP FOREIGN KEY `UserPreference_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `userPreferenceId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userpreference` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `User_userPreferenceId_key` ON `User`(`userPreferenceId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userPreferenceId_fkey` FOREIGN KEY (`userPreferenceId`) REFERENCES `UserPreference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
