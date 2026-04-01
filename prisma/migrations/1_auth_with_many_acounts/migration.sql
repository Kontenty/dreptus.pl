
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

-- AlterTable
ALTER TABLE `wp_comments` MODIFY `comment_date` datetime NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    MODIFY `comment_date_gmt` datetime NOT NULL DEFAULT ('2025-01-01 00:00:00');

-- AlterTable
ALTER TABLE `wp_duplicator_packages` MODIFY `created` datetime NULL;

-- AlterTable
ALTER TABLE `wp_links` MODIFY `link_updated` datetime NULL;

-- AlterTable
ALTER TABLE `wp_posts` MODIFY `post_date` datetime NULL,
    MODIFY `post_date_gmt` datetime NULL,
    MODIFY `post_modified` datetime NULL,
    MODIFY `post_modified_gmt` datetime NULL;

-- AlterTable
ALTER TABLE `wp_users` MODIFY `user_registered` datetime NOT NULL DEFAULT ('2025-01-01 00:00:00');

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

