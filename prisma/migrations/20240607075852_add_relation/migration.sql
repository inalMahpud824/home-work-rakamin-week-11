/*
  Warnings:

  - Added the required column `user_id` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `activities` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `items` MODIFY `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `activities` ADD CONSTRAINT `activities_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
