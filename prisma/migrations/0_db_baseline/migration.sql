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
    `created` DATETIME(0),
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
    `link_updated` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `link_rel` VARCHAR(255) NOT NULL DEFAULT '',
    `link_notes` MEDIUMTEXT NOT NULL,
    `link_rss` VARCHAR(255) NOT NULL DEFAULT '',

    INDEX `link_visible`(`link_visible`),
    PRIMARY KEY (`link_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_mo_openid_linked_user` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `linked_social_app` VARCHAR(55) NOT NULL,
    `linked_email` VARCHAR(55) NOT NULL,
    `user_id` BIGINT NOT NULL,
    `identifier` VARCHAR(100) NOT NULL,
    `timestamp` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),

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
    `post_date` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `post_date_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
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
    `post_modified` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `post_modified_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
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
CREATE TABLE `wp_wc_admin_note_actions` (
    `action_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `note_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `query` LONGTEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `actioned_text` VARCHAR(255) NOT NULL,

    INDEX `note_id`(`note_id`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Authenticator` (
    `credentialID` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `credentialPublicKey` VARCHAR(191) NOT NULL,
    `counter` INTEGER NOT NULL,
    `credentialDeviceType` VARCHAR(191) NOT NULL,
    `credentialBackedUp` BOOLEAN NOT NULL,
    `transports` VARCHAR(191) NULL,

    UNIQUE INDEX `Authenticator_credentialID_key`(`credentialID`),
    PRIMARY KEY (`userId`, `credentialID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TempTripParticipant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `origin` VARCHAR(50) NOT NULL,
    `trip_id` INTEGER NOT NULL,
    `answers` VARCHAR(10) NOT NULL,
    `report_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `back_trip_participant` (
    `id` INTEGER NOT NULL DEFAULT 0,
    `participant_id` INTEGER NOT NULL,
    `trip_id` INTEGER NOT NULL,
    `answers` VARCHAR(191) NOT NULL,
    `report_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listing_to_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listing_id` INTEGER NULL,
    `post_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_actionscheduler_actions` (
    `action_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `hook` VARCHAR(191) NOT NULL,
    `status` VARCHAR(20) NOT NULL,
    `scheduled_date_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `scheduled_date_local` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `args` VARCHAR(191) NULL,
    `schedule` LONGTEXT NULL,
    `group_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `last_attempt_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `last_attempt_local` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `claim_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `extended_args` VARCHAR(8000) NULL,

    INDEX `args`(`args`),
    INDEX `claim_id`(`claim_id`),
    INDEX `group_id`(`group_id`),
    INDEX `hook`(`hook`),
    INDEX `last_attempt_gmt`(`last_attempt_gmt`),
    INDEX `scheduled_date_gmt`(`scheduled_date_gmt`),
    INDEX `status`(`status`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_actionscheduler_claims` (
    `claim_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `date_created_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),

    INDEX `date_created_gmt`(`date_created_gmt`),
    PRIMARY KEY (`claim_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_actionscheduler_groups` (
    `group_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,

    INDEX `slug`(`slug`(191)),
    PRIMARY KEY (`group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_actionscheduler_logs` (
    `log_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `action_id` BIGINT UNSIGNED NOT NULL,
    `message` TEXT NOT NULL,
    `log_date_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `log_date_local` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),

    INDEX `action_id`(`action_id`),
    INDEX `log_date_gmt`(`log_date_gmt`),
    PRIMARY KEY (`log_id`)
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
CREATE TABLE `wp_product_catmeta` (
    `meta_id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_cat_id` BIGINT NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    UNIQUE INDEX `meta_id`(`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_quform_entries` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER UNSIGNED NOT NULL,
    `unread` BOOLEAN NOT NULL DEFAULT true,
    `ip` VARCHAR(45) NOT NULL,
    `form_url` VARCHAR(512) NOT NULL,
    `referring_url` VARCHAR(512) NOT NULL,
    `post_id` BIGINT UNSIGNED NULL,
    `created_by` BIGINT UNSIGNED NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'normal',

    INDEX `form_id`(`form_id`),
    INDEX `status`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_quform_entry_data` (
    `entry_id` INTEGER UNSIGNED NOT NULL,
    `element_id` INTEGER UNSIGNED NOT NULL,
    `value` MEDIUMTEXT NULL,

    INDEX `element_id`(`element_id`),
    PRIMARY KEY (`entry_id`, `element_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_quform_entry_entry_labels` (
    `entry_id` INTEGER UNSIGNED NOT NULL,
    `entry_label_id` INTEGER UNSIGNED NOT NULL,

    INDEX `entry_label_id`(`entry_label_id`),
    PRIMARY KEY (`entry_id`, `entry_label_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_quform_entry_labels` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `color` VARCHAR(32) NOT NULL,

    INDEX `form_id`(`form_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_quform_forms` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    `config` LONGTEXT NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `trashed` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `active`(`active`),
    INDEX `trashed`(`trashed`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_quform_sessions` (
    `id` VARCHAR(40) NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `last_activity` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_css` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `handle` TEXT NOT NULL,
    `settings` LONGTEXT NULL,
    `hover` LONGTEXT NULL,
    `advanced` LONGTEXT NULL,
    `params` LONGTEXT NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_css_bkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `handle` TEXT NOT NULL,
    `settings` LONGTEXT NULL,
    `hover` LONGTEXT NULL,
    `advanced` LONGTEXT NULL,
    `params` LONGTEXT NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_layer_animations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `handle` TEXT NOT NULL,
    `params` TEXT NOT NULL,
    `settings` TEXT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_layer_animations_bkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `handle` TEXT NOT NULL,
    `params` TEXT NOT NULL,
    `settings` TEXT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_navigations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `handle` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `css` LONGTEXT NOT NULL,
    `markup` LONGTEXT NOT NULL,
    `settings` LONGTEXT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_navigations_bkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `handle` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `css` LONGTEXT NOT NULL,
    `markup` LONGTEXT NOT NULL,
    `settings` LONGTEXT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_sliders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TINYTEXT NOT NULL,
    `alias` TINYTEXT NULL,
    `params` LONGTEXT NOT NULL,
    `settings` TEXT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_sliders_bkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TINYTEXT NOT NULL,
    `alias` TINYTEXT NULL,
    `params` LONGTEXT NOT NULL,
    `settings` TEXT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT '',

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_slides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slider_id` INTEGER NOT NULL,
    `slide_order` INTEGER NOT NULL,
    `params` LONGTEXT NOT NULL,
    `layers` LONGTEXT NOT NULL,
    `settings` TEXT NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_slides_bkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slider_id` INTEGER NOT NULL,
    `slide_order` INTEGER NOT NULL,
    `params` LONGTEXT NOT NULL,
    `layers` LONGTEXT NOT NULL,
    `settings` TEXT NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_static_slides` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slider_id` INTEGER NOT NULL,
    `params` LONGTEXT NOT NULL,
    `layers` LONGTEXT NOT NULL,
    `settings` TEXT NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_revslider_static_slides_bkp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slider_id` INTEGER NOT NULL,
    `params` LONGTEXT NOT NULL,
    `layers` LONGTEXT NOT NULL,
    `settings` TEXT NOT NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_rsssl_csp_log` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `time` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `documenturi` TEXT NOT NULL,
    `violateddirective` TEXT NOT NULL,
    `blockeduri` TEXT NOT NULL,
    `inpolicy` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_admin_notes` (
    `note_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `locale` VARCHAR(20) NOT NULL,
    `title` LONGTEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `content_data` LONGTEXT NULL,
    `status` VARCHAR(200) NOT NULL,
    `source` VARCHAR(200) NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `date_reminder` DATETIME(0) NULL,
    `is_snoozable` BOOLEAN NOT NULL DEFAULT false,
    `layout` VARCHAR(20) NOT NULL DEFAULT '',
    `image` VARCHAR(200) NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `icon` VARCHAR(200) NOT NULL DEFAULT 'info',

    PRIMARY KEY (`note_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_category_lookup` (
    `category_tree_id` BIGINT UNSIGNED NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`category_tree_id`, `category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_customer_lookup` (
    `customer_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NULL,
    `username` VARCHAR(60) NOT NULL DEFAULT '',
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(100) NULL,
    `date_last_active` TIMESTAMP(0) NULL,
    `date_registered` TIMESTAMP(0) NULL,
    `country` CHAR(2) NOT NULL DEFAULT '',
    `postcode` VARCHAR(20) NOT NULL DEFAULT '',
    `city` VARCHAR(100) NOT NULL DEFAULT '',
    `state` VARCHAR(100) NOT NULL DEFAULT '',

    UNIQUE INDEX `user_id`(`user_id`),
    INDEX `email`(`email`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_download_log` (
    `download_log_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(0) NOT NULL,
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `user_ip_address` VARCHAR(100) NULL DEFAULT '',

    INDEX `permission_id`(`permission_id`),
    INDEX `timestamp`(`timestamp`),
    PRIMARY KEY (`download_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_order_coupon_lookup` (
    `order_id` BIGINT UNSIGNED NOT NULL,
    `coupon_id` BIGINT NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `discount_amount` DOUBLE NOT NULL DEFAULT 0,

    INDEX `coupon_id`(`coupon_id`),
    INDEX `date_created`(`date_created`),
    PRIMARY KEY (`order_id`, `coupon_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_order_product_lookup` (
    `order_item_id` BIGINT UNSIGNED NOT NULL,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `variation_id` BIGINT UNSIGNED NOT NULL,
    `customer_id` BIGINT UNSIGNED NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `product_qty` INTEGER NOT NULL,
    `product_net_revenue` DOUBLE NOT NULL DEFAULT 0,
    `product_gross_revenue` DOUBLE NOT NULL DEFAULT 0,
    `coupon_amount` DOUBLE NOT NULL DEFAULT 0,
    `tax_amount` DOUBLE NOT NULL DEFAULT 0,
    `shipping_amount` DOUBLE NOT NULL DEFAULT 0,
    `shipping_tax_amount` DOUBLE NOT NULL DEFAULT 0,

    INDEX `customer_id`(`customer_id`),
    INDEX `date_created`(`date_created`),
    INDEX `order_id`(`order_id`),
    INDEX `product_id`(`product_id`),
    PRIMARY KEY (`order_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_order_stats` (
    `order_id` BIGINT UNSIGNED NOT NULL,
    `parent_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `date_created_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `num_items_sold` INTEGER NOT NULL DEFAULT 0,
    `total_sales` DOUBLE NOT NULL DEFAULT 0,
    `tax_total` DOUBLE NOT NULL DEFAULT 0,
    `shipping_total` DOUBLE NOT NULL DEFAULT 0,
    `net_total` DOUBLE NOT NULL DEFAULT 0,
    `returning_customer` BOOLEAN NULL,
    `status` VARCHAR(200) NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL,

    INDEX `customer_id`(`customer_id`),
    INDEX `date_created`(`date_created`),
    INDEX `status`(`status`(191)),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_order_tax_lookup` (
    `order_id` BIGINT UNSIGNED NOT NULL,
    `tax_rate_id` BIGINT UNSIGNED NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `shipping_tax` DOUBLE NOT NULL DEFAULT 0,
    `order_tax` DOUBLE NOT NULL DEFAULT 0,
    `total_tax` DOUBLE NOT NULL DEFAULT 0,

    INDEX `date_created`(`date_created`),
    INDEX `tax_rate_id`(`tax_rate_id`),
    PRIMARY KEY (`order_id`, `tax_rate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_product_meta_lookup` (
    `product_id` BIGINT NOT NULL,
    `sku` VARCHAR(100) NULL DEFAULT '',
    `virtual` BOOLEAN NULL DEFAULT false,
    `downloadable` BOOLEAN NULL DEFAULT false,
    `min_price` DECIMAL(19, 4) NULL,
    `max_price` DECIMAL(19, 4) NULL,
    `onsale` BOOLEAN NULL DEFAULT false,
    `stock_quantity` DOUBLE NULL,
    `stock_status` VARCHAR(100) NULL DEFAULT 'instock',
    `rating_count` BIGINT NULL DEFAULT 0,
    `average_rating` DECIMAL(3, 2) NULL DEFAULT 0.00,
    `total_sales` BIGINT NULL DEFAULT 0,
    `tax_status` VARCHAR(100) NULL DEFAULT 'taxable',
    `tax_class` VARCHAR(100) NULL DEFAULT '',

    INDEX `downloadable`(`downloadable`),
    INDEX `min_max_price`(`min_price`, `max_price`),
    INDEX `onsale`(`onsale`),
    INDEX `stock_quantity`(`stock_quantity`),
    INDEX `stock_status`(`stock_status`),
    INDEX `virtual`(`virtual`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_reserved_stock` (
    `order_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `stock_quantity` DOUBLE NOT NULL DEFAULT 0,
    `timestamp` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `expires` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),

    PRIMARY KEY (`order_id`, `product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_tax_rate_classes` (
    `tax_rate_class_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL DEFAULT '',
    `slug` VARCHAR(200) NOT NULL DEFAULT '',

    UNIQUE INDEX `slug`(`slug`(191)),
    PRIMARY KEY (`tax_rate_class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_wc_webhooks` (
    `webhook_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(200) NOT NULL,
    `name` TEXT NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `delivery_url` TEXT NOT NULL,
    `secret` TEXT NOT NULL,
    `topic` VARCHAR(200) NOT NULL,
    `date_created` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `date_created_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `date_modified` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `date_modified_gmt` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `api_version` SMALLINT NOT NULL,
    `failure_count` SMALLINT NOT NULL DEFAULT 0,
    `pending_delivery` BOOLEAN NOT NULL DEFAULT false,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`webhook_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_api_keys` (
    `key_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `description` VARCHAR(200) NULL,
    `permissions` VARCHAR(10) NOT NULL,
    `consumer_key` CHAR(64) NOT NULL,
    `consumer_secret` CHAR(43) NOT NULL,
    `nonces` LONGTEXT NULL,
    `truncated_key` CHAR(7) NOT NULL,
    `last_access` DATETIME(0) NULL,

    INDEX `consumer_key`(`consumer_key`),
    INDEX `consumer_secret`(`consumer_secret`),
    PRIMARY KEY (`key_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_attribute_taxonomies` (
    `attribute_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `attribute_name` VARCHAR(200) NOT NULL,
    `attribute_label` VARCHAR(200) NULL,
    `attribute_type` VARCHAR(20) NOT NULL,
    `attribute_orderby` VARCHAR(20) NOT NULL,
    `attribute_public` INTEGER NOT NULL DEFAULT 1,

    INDEX `attribute_name`(`attribute_name`(20)),
    PRIMARY KEY (`attribute_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_downloadable_product_permissions` (
    `permission_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `download_id` VARCHAR(36) NOT NULL,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `order_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `order_key` VARCHAR(200) NOT NULL,
    `user_email` VARCHAR(200) NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `downloads_remaining` VARCHAR(9) NULL,
    `access_granted` DATETIME(0) NOT NULL DEFAULT ('2025-01-01 00:00:00'),
    `access_expires` DATETIME(0) NULL,
    `download_count` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    INDEX `download_order_key_product`(`product_id`, `order_id`, `order_key`(16), `download_id`),
    INDEX `download_order_product`(`download_id`, `order_id`, `product_id`),
    INDEX `order_id`(`order_id`),
    INDEX `user_order_remaining_expires`(`user_id`, `order_id`, `downloads_remaining`, `access_expires`),
    PRIMARY KEY (`permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_log` (
    `log_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(0) NOT NULL,
    `level` SMALLINT NOT NULL,
    `source` VARCHAR(200) NOT NULL,
    `message` LONGTEXT NOT NULL,
    `context` LONGTEXT NULL,

    INDEX `level`(`level`),
    PRIMARY KEY (`log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_order_itemmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_item_id` BIGINT UNSIGNED NOT NULL,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(32)),
    INDEX `order_item_id`(`order_item_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_order_items` (
    `order_item_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_item_name` TEXT NOT NULL,
    `order_item_type` VARCHAR(200) NOT NULL DEFAULT '',
    `order_id` BIGINT UNSIGNED NOT NULL,

    INDEX `order_id`(`order_id`),
    PRIMARY KEY (`order_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_payment_tokenmeta` (
    `meta_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `payment_token_id` BIGINT UNSIGNED NOT NULL,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(32)),
    INDEX `payment_token_id`(`payment_token_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_payment_tokens` (
    `token_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `gateway_id` VARCHAR(200) NOT NULL,
    `token` TEXT NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `type` VARCHAR(200) NOT NULL,
    `is_default` BOOLEAN NOT NULL DEFAULT false,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`token_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_sessions` (
    `session_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `session_key` CHAR(32) NOT NULL,
    `session_value` LONGTEXT NOT NULL,
    `session_expiry` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `session_key`(`session_key`),
    PRIMARY KEY (`session_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_shipping_zone_locations` (
    `location_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `zone_id` BIGINT UNSIGNED NOT NULL,
    `location_code` VARCHAR(200) NOT NULL,
    `location_type` VARCHAR(40) NOT NULL,

    INDEX `location_id`(`location_id`),
    INDEX `location_type_code`(`location_type`(10), `location_code`(20)),
    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_shipping_zone_methods` (
    `zone_id` BIGINT UNSIGNED NOT NULL,
    `instance_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `method_id` VARCHAR(200) NOT NULL,
    `method_order` BIGINT UNSIGNED NOT NULL,
    `is_enabled` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`instance_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_shipping_zones` (
    `zone_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `zone_name` VARCHAR(200) NOT NULL,
    `zone_order` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`zone_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_tax_rate_locations` (
    `location_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `location_code` VARCHAR(200) NOT NULL,
    `tax_rate_id` BIGINT UNSIGNED NOT NULL,
    `location_type` VARCHAR(40) NOT NULL,

    INDEX `location_type_code`(`location_type`(10), `location_code`(20)),
    INDEX `tax_rate_id`(`tax_rate_id`),
    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_woocommerce_tax_rates` (
    `tax_rate_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tax_rate_country` VARCHAR(2) NOT NULL DEFAULT '',
    `tax_rate_state` VARCHAR(200) NOT NULL DEFAULT '',
    `tax_rate` VARCHAR(8) NOT NULL DEFAULT '',
    `tax_rate_name` VARCHAR(200) NOT NULL DEFAULT '',
    `tax_rate_priority` BIGINT UNSIGNED NOT NULL,
    `tax_rate_compound` INTEGER NOT NULL DEFAULT 0,
    `tax_rate_shipping` INTEGER NOT NULL DEFAULT 1,
    `tax_rate_order` BIGINT UNSIGNED NOT NULL,
    `tax_rate_class` VARCHAR(200) NOT NULL DEFAULT '',

    INDEX `tax_rate_class`(`tax_rate_class`(10)),
    INDEX `tax_rate_country`(`tax_rate_country`),
    INDEX `tax_rate_priority`(`tax_rate_priority`),
    INDEX `tax_rate_state`(`tax_rate_state`(2)),
    PRIMARY KEY (`tax_rate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TripParticipant` ADD CONSTRAINT `TripParticipant_participant_id_fkey` FOREIGN KEY (`participant_id`) REFERENCES `Participant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Authenticator` ADD CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

