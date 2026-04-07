
-- DropIndex
DROP INDEX `VerificationToken_token_key` ON `VerificationToken`;

-- AlterTable
ALTER TABLE `TripParticipant` MODIFY `trip_id` bigint(20) unsigned NOT NULL;

-- AlterTable
ALTER TABLE `Account` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `refresh_token_expires_in` INTEGER NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Session` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` DROP COLUMN `role`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `username` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `TripParticipant_trip_id_fkey` ON `TripParticipant`(`trip_id` ASC);

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId` ASC);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId` ASC);

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username` ASC);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripParticipant` ADD CONSTRAINT `TripParticipant_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `wp_posts`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

