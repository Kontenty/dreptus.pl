-- CreateTable
CREATE TABLE `Participant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `origin` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Participant_name_origin_key`(`name`, `origin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripParticipant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `participant_id` INTEGER NOT NULL,
    `trip_id` INTEGER NOT NULL,
    `answers` VARCHAR(191) NOT NULL,
    `report_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TripParticipant_participant_id_fkey`(`participant_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_postmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `post_id`(`post_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_posts` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_author` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `post_date` DATETIME(0) NULL,
    `post_date_gmt` DATETIME(0) NULL,
    `post_content` LONGTEXT NOT NULL,
    `post_title` TEXT NOT NULL,
    `post_excerpt` TEXT NOT NULL,
    `post_status` VARCHAR(20) NOT NULL DEFAULT 'publish',
    `comment_status` VARCHAR(20) NOT NULL DEFAULT 'open',
    `ping_status` VARCHAR(20) NOT NULL DEFAULT 'open',
    `post_password` VARCHAR(255) NOT NULL DEFAULT '',
    `post_name` VARCHAR(200) NOT NULL DEFAULT '',
    `to_ping` TEXT NOT NULL,
    `pinged` TEXT NOT NULL,
    `post_modified` DATETIME(0) NULL,
    `post_modified_gmt` DATETIME(0) NULL,
    `post_content_filtered` LONGTEXT NOT NULL,
    `post_parent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `guid` VARCHAR(255) NOT NULL DEFAULT '',
    `menu_order` INTEGER NOT NULL DEFAULT 0,
    `post_type` VARCHAR(20) NOT NULL DEFAULT 'post',
    `post_mime_type` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_count` BIGINT NOT NULL DEFAULT 0,

    INDEX `post_author`(`post_author`),
    INDEX `post_name`(`post_name`(191)),
    INDEX `post_parent`(`post_parent`),
    INDEX `type_status_date`(`post_type`, `post_status`, `post_date`, `ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_term_relationships` (
    `object_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `term_taxonomy_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `term_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `term_taxonomy_id`(`term_taxonomy_id`),
    PRIMARY KEY (`object_id`, `term_taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_term_taxonomy` (
    `term_taxonomy_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `term_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `taxonomy` VARCHAR(32) NOT NULL DEFAULT '',
    `description` LONGTEXT NOT NULL,
    `parent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `count` BIGINT NOT NULL DEFAULT 0,

    INDEX `taxonomy`(`taxonomy`),
    UNIQUE INDEX `term_id_taxonomy`(`term_id`, `taxonomy`),
    PRIMARY KEY (`term_taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_termmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `term_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `term_id`(`term_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_terms` (
    `term_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL DEFAULT '',
    `slug` VARCHAR(200) NOT NULL DEFAULT '',
    `term_group` BIGINT NOT NULL DEFAULT 0,

    INDEX `name`(`name`(191)),
    INDEX `slug`(`slug`(191)),
    PRIMARY KEY (`term_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_usermeta` (
    `umeta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`umeta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_users` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_login` VARCHAR(60) NOT NULL DEFAULT '',
    `user_pass` VARCHAR(255) NOT NULL DEFAULT '',
    `user_nicename` VARCHAR(50) NOT NULL DEFAULT '',
    `user_email` VARCHAR(100) NOT NULL DEFAULT '',
    `user_url` VARCHAR(100) NOT NULL DEFAULT '',
    `user_registered` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `user_activation_key` VARCHAR(255) NOT NULL DEFAULT '',
    `user_status` INTEGER NOT NULL DEFAULT 0,
    `display_name` VARCHAR(250) NOT NULL DEFAULT '',

    INDEX `user_email`(`user_email`),
    INDEX `user_login_key`(`user_login`),
    INDEX `user_nicename`(`user_nicename`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listing_to_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listing_id` INTEGER NULL,
    `post_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_debug_log` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(25) NOT NULL DEFAULT '',
    `message` TEXT NOT NULL DEFAULT '',
    `type` VARCHAR(25) NOT NULL DEFAULT '',
    `created` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_events` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `event_type` VARCHAR(150) NOT NULL DEFAULT '',
    `username` VARCHAR(150) NULL,
    `user_id` BIGINT NULL,
    `event_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `ip_or_host` VARCHAR(100) NULL,
    `referer_info` VARCHAR(255) NULL,
    `url` VARCHAR(255) NULL,
    `country_code` VARCHAR(50) NULL,
    `event_data` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_failed_logins` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `user_login` VARCHAR(150) NOT NULL,
    `failed_login_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `login_attempt_ip` VARCHAR(100) NOT NULL DEFAULT '',

    INDEX `failed_login_date`(`failed_login_date`),
    INDEX `failed_login_date_and_login_attempt_ip`(`failed_login_date`, `login_attempt_ip`),
    INDEX `login_attempt_ip`(`login_attempt_ip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_global_meta` (
    `meta_id` BIGINT NOT NULL AUTO_INCREMENT,
    `date_time` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `meta_key1` VARCHAR(255) NOT NULL,
    `meta_key2` VARCHAR(255) NOT NULL,
    `meta_key3` VARCHAR(255) NOT NULL,
    `meta_key4` VARCHAR(255) NOT NULL,
    `meta_key5` VARCHAR(255) NOT NULL,
    `meta_value1` VARCHAR(255) NOT NULL,
    `meta_value2` TEXT NOT NULL,
    `meta_value3` TEXT NOT NULL,
    `meta_value4` LONGTEXT NOT NULL,
    `meta_value5` LONGTEXT NOT NULL,

    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_login_activity` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `user_login` VARCHAR(150) NOT NULL,
    `login_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `logout_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `login_ip` VARCHAR(100) NOT NULL DEFAULT '',
    `login_country` VARCHAR(150) NOT NULL DEFAULT '',
    `browser_type` VARCHAR(150) NOT NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_login_lockdown` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `user_login` VARCHAR(150) NOT NULL,
    `lockdown_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `release_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `failed_login_ip` VARCHAR(100) NOT NULL DEFAULT '',
    `lock_reason` VARCHAR(128) NOT NULL DEFAULT '',
    `unlock_key` VARCHAR(128) NOT NULL DEFAULT '',
    `is_lockout_email_sent` BOOLEAN NOT NULL DEFAULT true,
    `backtrace_log` TEXT NOT NULL DEFAULT '',

    INDEX `failed_login_ip`(`failed_login_ip`),
    INDEX `is_lockout_email_sent`(`is_lockout_email_sent`),
    INDEX `unlock_key`(`unlock_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_aiowps_permanent_block` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `blocked_ip` VARCHAR(100) NOT NULL DEFAULT '',
    `block_reason` VARCHAR(128) NOT NULL DEFAULT '',
    `country_origin` VARCHAR(50) NOT NULL DEFAULT '',
    `blocked_date` DATETIME(0) NOT NULL DEFAULT ('1000-10-10 10:00:00'),
    `unblock` BOOLEAN NOT NULL DEFAULT false,

    INDEX `blocked_ip`(`blocked_ip`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_commentmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `comment_id`(`comment_id`),
    INDEX `meta_key`(`meta_key`(191)),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_comments` (
    `comment_ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `comment_post_ID` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `comment_author` TINYTEXT NOT NULL,
    `comment_author_email` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_author_url` VARCHAR(200) NOT NULL DEFAULT '',
    `comment_author_IP` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_date` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `comment_date_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `comment_content` TEXT NOT NULL,
    `comment_karma` INTEGER NOT NULL DEFAULT 0,
    `comment_approved` VARCHAR(20) NOT NULL DEFAULT '1',
    `comment_agent` VARCHAR(255) NOT NULL DEFAULT '',
    `comment_type` VARCHAR(20) NOT NULL DEFAULT 'comment',
    `comment_parent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `user_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `comment_approved_date_gmt`(`comment_approved`, `comment_date_gmt`),
    INDEX `comment_author_email`(`comment_author_email`(10)),
    INDEX `comment_date_gmt`(`comment_date_gmt`),
    INDEX `comment_parent`(`comment_parent`),
    INDEX `comment_post_ID`(`comment_post_ID`),
    INDEX `woo_idx_comment_type`(`comment_type`),
    PRIMARY KEY (`comment_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_austats` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `author_id` BIGINT UNSIGNED NOT NULL,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `child_post_id` BIGINT UNSIGNED NULL,
    `type` VARCHAR(100) NULL,
    `total` DECIMAL(13, 4) NOT NULL,
    `fee_rate` DECIMAL(5, 2) NOT NULL,
    `fee` DECIMAL(13, 4) NOT NULL,
    `earning` DECIMAL(13, 4) NOT NULL,
    `meta` LONGTEXT NULL,
    `year` VARCHAR(4) NULL,
    `month` VARCHAR(2) NULL,
    `date` DATE NULL,
    `time` INTEGER NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_booking` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `booking_id` BIGINT UNSIGNED NOT NULL,
    `room_id` BIGINT UNSIGNED NOT NULL,
    `guest_id` BIGINT UNSIGNED NOT NULL,
    `listing_id` BIGINT UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_from` BIGINT UNSIGNED NULL,
    `date_to` BIGINT UNSIGNED NULL,
    `quantity` TINYINT NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_chat` (
    `c_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_one` BIGINT UNSIGNED NOT NULL,
    `user_two` BIGINT UNSIGNED NOT NULL,
    `ip` VARCHAR(30) NULL,
    `time` INTEGER NULL,

    PRIMARY KEY (`c_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_chat_reply` (
    `cr_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `reply` TEXT NULL,
    `user_id_fk` BIGINT UNSIGNED NOT NULL,
    `ip` VARCHAR(30) NULL,
    `time` INTEGER NULL,
    `c_id_fk` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`cr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_lstats` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT UNSIGNED NOT NULL,
    `child_post_id` BIGINT UNSIGNED NULL,
    `type` VARCHAR(100) NULL,
    `value` INTEGER NOT NULL,
    `meta` LONGTEXT NULL,
    `year` VARCHAR(4) NULL,
    `month` VARCHAR(2) NULL,
    `date` DATE NULL,
    `time` INTEGER NULL,
    `ip` VARCHAR(30) NULL,
    `guest_id` BIGINT UNSIGNED NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_noti` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `notification_obj_id` INTEGER UNSIGNED NOT NULL,
    `notifier_id` BIGINT UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_noti_change` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `notification_obj_id` INTEGER UNSIGNED NOT NULL,
    `actor_id` BIGINT UNSIGNED NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_noti_obj` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `entity_type_id` INTEGER UNSIGNED NOT NULL,
    `entity_id` INTEGER UNSIGNED NOT NULL,
    `time` INTEGER NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_wkhours` (
    `ID` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT UNSIGNED NOT NULL,
    `day` VARCHAR(50) NOT NULL,
    `day_num` BOOLEAN NOT NULL,
    `static` VARCHAR(100) NOT NULL,
    `open` TIME(0) NULL,
    `close` TIME(0) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_duplicator_packages` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `hash` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL,
    `created` DATETIME(0) NULL,
    `owner` VARCHAR(60) NOT NULL,
    `package` LONGTEXT NOT NULL,

    INDEX `hash`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_e_submissions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NULL,
    `hash_id` VARCHAR(255) NOT NULL,
    `main_meta_id` BIGINT UNSIGNED NOT NULL,
    `post_id` BIGINT UNSIGNED NOT NULL,
    `referer` VARCHAR(500) NOT NULL,
    `referer_title` VARCHAR(300) NULL,
    `element_id` VARCHAR(255) NOT NULL,
    `form_name` VARCHAR(255) NOT NULL,
    `campaign_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `user_ip` VARCHAR(46) NOT NULL,
    `user_agent` TEXT NOT NULL,
    `actions_count` INTEGER NULL DEFAULT 0,
    `actions_succeeded_count` INTEGER NULL DEFAULT 0,
    `status` VARCHAR(20) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `meta` TEXT NULL,
    `created_at_gmt` DATETIME(0) NOT NULL,
    `updated_at_gmt` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_e_submissions_actions_log` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `submission_id` BIGINT UNSIGNED NOT NULL,
    `action_name` VARCHAR(255) NOT NULL,
    `action_label` VARCHAR(255) NULL,
    `status` VARCHAR(20) NOT NULL,
    `log` TEXT NULL,
    `created_at_gmt` DATETIME(0) NOT NULL,
    `updated_at_gmt` DATETIME(0) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_e_submissions_values` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `submission_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `key` VARCHAR(255) NULL,
    `value` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_knowhere_job_listing_post_views` (
    `id` BIGINT UNSIGNED NOT NULL,
    `type` BOOLEAN NOT NULL,
    `period` VARCHAR(8) NOT NULL,
    `count` BIGINT UNSIGNED NOT NULL,

    INDEX `type_period_count`(`type`, `period`, `count`),
    UNIQUE INDEX `id_type_period_count`(`id`, `type`, `period`, `count`),
    PRIMARY KEY (`type`, `period`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_links` (
    `link_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `link_url` VARCHAR(255) NOT NULL DEFAULT '',
    `link_name` VARCHAR(255) NOT NULL DEFAULT '',
    `link_image` VARCHAR(255) NOT NULL DEFAULT '',
    `link_target` VARCHAR(25) NOT NULL DEFAULT '',
    `link_description` VARCHAR(255) NOT NULL DEFAULT '',
    `link_visible` VARCHAR(20) NOT NULL DEFAULT 'Y',
    `link_owner` BIGINT UNSIGNED NOT NULL DEFAULT 1,
    `link_rating` INTEGER NOT NULL DEFAULT 0,
    `link_updated` DATETIME(0) NULL,
    `link_rel` VARCHAR(255) NOT NULL DEFAULT '',
    `link_notes` MEDIUMTEXT NOT NULL,
    `link_rss` VARCHAR(255) NOT NULL DEFAULT '',

    INDEX `link_visible`(`link_visible`),
    PRIMARY KEY (`link_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_litespeed_img_optm` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `optm_status` TINYINT NOT NULL DEFAULT 0,
    `src` TEXT NOT NULL,
    `src_filesize` INTEGER NOT NULL DEFAULT 0,
    `target_filesize` INTEGER NOT NULL DEFAULT 0,
    `webp_filesize` INTEGER NOT NULL DEFAULT 0,

    INDEX `optm_status`(`optm_status`),
    INDEX `post_id`(`post_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_litespeed_img_optming` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `post_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `optm_status` TINYINT NOT NULL DEFAULT 0,
    `src` VARCHAR(1000) NOT NULL DEFAULT '',
    `server_info` TEXT NOT NULL,

    INDEX `optm_status`(`optm_status`),
    INDEX `post_id`(`post_id`),
    INDEX `src`(`src`(191)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_options` (
    `option_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(191) NOT NULL DEFAULT '',
    `option_value` LONGTEXT NOT NULL,
    `autoload` VARCHAR(20) NOT NULL DEFAULT 'yes',

    UNIQUE INDEX `option_name`(`option_name`),
    INDEX `autoload`(`autoload`),
    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_product_catmeta` (
    `meta_id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_cat_id` BIGINT NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    UNIQUE INDEX `meta_id`(`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TripParticipant` ADD CONSTRAINT `TripParticipant_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

