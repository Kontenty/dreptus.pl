-- CreateTable
CREATE TABLE `Badge` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `rules_page_id` INTEGER NULL,

    UNIQUE INDEX `Badge_slug_key`(`slug`),
    INDEX `Badge_slug_idx`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BadgeDegree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `badge_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `sort_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `BadgeDegree_badge_id_idx`(`badge_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BadgeScorer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `participant_id` INTEGER NOT NULL,
    `badge_id` INTEGER NOT NULL,
    `degree_id` INTEGER NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `BadgeScorer_badge_id_idx`(`badge_id`),
    INDEX `BadgeScorer_degree_id_idx`(`degree_id`),
    INDEX `BadgeScorer_participant_id_idx`(`participant_id`),
    UNIQUE INDEX `BadgeScorer_participant_id_badge_id_key`(`participant_id`, `badge_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BadgeDegree` ADD CONSTRAINT `BadgeDegree_badge_id_fkey` FOREIGN KEY (`badge_id`) REFERENCES `Badge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BadgeScorer` ADD CONSTRAINT `BadgeScorer_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BadgeScorer` ADD CONSTRAINT `BadgeScorer_badge_id_fkey` FOREIGN KEY (`badge_id`) REFERENCES `Badge`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BadgeScorer` ADD CONSTRAINT `BadgeScorer_degree_id_fkey` FOREIGN KEY (`degree_id`) REFERENCES `BadgeDegree`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
