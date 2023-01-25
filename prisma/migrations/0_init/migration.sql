-- CreateTable
CREATE TABLE `wp_commentmeta` (
    `meta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_id` INTEGER NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `comment_id`(`comment_id`),
    INDEX `meta_key`(`meta_key`(191)),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_comments` (
    `comment_ID` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_post_ID` INTEGER NOT NULL DEFAULT 0,
    `comment_author` TINYTEXT NOT NULL,
    `comment_author_email` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_author_url` VARCHAR(200) NOT NULL DEFAULT '',
    `comment_author_IP` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_date` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `comment_date_gmt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `comment_content` TEXT NOT NULL,
    `comment_karma` INTEGER NOT NULL DEFAULT 0,
    `comment_approved` VARCHAR(20) NOT NULL DEFAULT '1',
    `comment_agent` VARCHAR(255) NOT NULL DEFAULT '',
    `comment_type` VARCHAR(20) NOT NULL DEFAULT 'comment',
    `comment_parent` INTEGER NOT NULL DEFAULT 0,
    `user_id` INTEGER NOT NULL DEFAULT 0,

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
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `author_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `child_post_id` INTEGER NULL,
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
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `booking_id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,
    `guest_id` INTEGER NOT NULL,
    `listing_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `date_from` INTEGER NULL,
    `date_to` INTEGER NULL,
    `quantity` TINYINT NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_chat` (
    `c_id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_one` INTEGER NOT NULL,
    `user_two` INTEGER NOT NULL,
    `ip` VARCHAR(30) NULL,
    `time` INTEGER NULL,

    PRIMARY KEY (`c_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_chat_reply` (
    `cr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `reply` TEXT NULL,
    `user_id_fk` INTEGER NOT NULL,
    `ip` VARCHAR(30) NULL,
    `time` INTEGER NULL,
    `c_id_fk` INTEGER UNSIGNED NOT NULL,
    `status` BOOLEAN NULL DEFAULT false,

    PRIMARY KEY (`cr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_lstats` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `child_post_id` INTEGER NULL,
    `type` VARCHAR(100) NULL,
    `value` INTEGER NOT NULL,
    `meta` LONGTEXT NULL,
    `year` VARCHAR(4) NULL,
    `month` VARCHAR(2) NULL,
    `date` DATE NULL,
    `time` INTEGER NULL,
    `ip` VARCHAR(30) NULL,
    `guest_id` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_noti` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `notification_obj_id` INTEGER UNSIGNED NOT NULL,
    `notifier_id` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_cth_noti_change` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `notification_obj_id` INTEGER UNSIGNED NOT NULL,
    `actor_id` INTEGER NOT NULL,
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
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL,
    `day` VARCHAR(50) NOT NULL,
    `day_num` BOOLEAN NOT NULL,
    `static` VARCHAR(100) NOT NULL,
    `open` TIME(0) NULL,
    `close` TIME(0) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_duplicator_packages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `hash` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL,
    `created` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `owner` VARCHAR(60) NOT NULL,
    `package` LONGTEXT NOT NULL,

    INDEX `hash`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_e_submissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NULL,
    `hash_id` VARCHAR(255) NOT NULL,
    `main_meta_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,
    `referer` VARCHAR(500) NOT NULL,
    `referer_title` VARCHAR(300) NULL,
    `element_id` VARCHAR(255) NOT NULL,
    `form_name` VARCHAR(255) NOT NULL,
    `campaign_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `submission_id` INTEGER NOT NULL,
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
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `submission_id` INTEGER NOT NULL DEFAULT 0,
    `key` VARCHAR(255) NULL,
    `value` LONGTEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_knowhere_job_listing_post_views` (
    `id` INTEGER NOT NULL,
    `type` BOOLEAN NOT NULL,
    `period` VARCHAR(8) NOT NULL,
    `count` INTEGER NOT NULL,

    INDEX `type_period_count`(`type`, `period`, `count`),
    UNIQUE INDEX `id_type_period_count`(`id`, `type`, `period`, `count`),
    PRIMARY KEY (`type`, `period`, `id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_links` (
    `link_id` INTEGER NOT NULL AUTO_INCREMENT,
    `link_url` VARCHAR(255) NOT NULL DEFAULT '',
    `link_name` VARCHAR(255) NOT NULL DEFAULT '',
    `link_image` VARCHAR(255) NOT NULL DEFAULT '',
    `link_target` VARCHAR(25) NOT NULL DEFAULT '',
    `link_description` VARCHAR(255) NOT NULL DEFAULT '',
    `link_visible` VARCHAR(20) NOT NULL DEFAULT 'Y',
    `link_owner` INTEGER NOT NULL DEFAULT 1,
    `link_rating` INTEGER NOT NULL DEFAULT 0,
    `link_updated` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
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
    `user_id` INTEGER NOT NULL,
    `identifier` VARCHAR(100) NOT NULL,
    `timestamp` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_options` (
    `option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `option_name` VARCHAR(191) NOT NULL DEFAULT '',
    `option_value` LONGTEXT NOT NULL,
    `autoload` VARCHAR(20) NOT NULL DEFAULT 'yes',

    UNIQUE INDEX `option_name`(`option_name`),
    INDEX `autoload`(`autoload`),
    PRIMARY KEY (`option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_postmeta` (
    `meta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_id` INTEGER NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `post_id`(`post_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_posts` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `post_author` INTEGER NOT NULL DEFAULT 0,
    `post_date` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_date_gmt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
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
    `post_modified` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_modified_gmt` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
    `post_content_filtered` LONGTEXT NOT NULL,
    `post_parent` INTEGER NOT NULL DEFAULT 0,
    `guid` VARCHAR(255) NOT NULL DEFAULT '',
    `menu_order` INTEGER NOT NULL DEFAULT 0,
    `post_type` VARCHAR(20) NOT NULL DEFAULT 'post',
    `post_mime_type` VARCHAR(100) NOT NULL DEFAULT '',
    `comment_count` INTEGER NOT NULL DEFAULT 0,

    INDEX `post_author`(`post_author`),
    INDEX `post_name`(`post_name`(191)),
    INDEX `post_parent`(`post_parent`),
    INDEX `type_status_date`(`post_type`, `post_status`, `post_date`, `ID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_term_relationships` (
    `object_id` INTEGER NOT NULL DEFAULT 0,
    `term_taxonomy_id` INTEGER NOT NULL DEFAULT 0,
    `term_order` INTEGER NOT NULL DEFAULT 0,

    INDEX `term_taxonomy_id`(`term_taxonomy_id`),
    PRIMARY KEY (`object_id`, `term_taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_term_taxonomy` (
    `term_taxonomy_id` INTEGER NOT NULL AUTO_INCREMENT,
    `term_id` INTEGER NOT NULL DEFAULT 0,
    `taxonomy` VARCHAR(32) NOT NULL DEFAULT '',
    `description` LONGTEXT NOT NULL,
    `parent` INTEGER NOT NULL DEFAULT 0,
    `count` INTEGER NOT NULL DEFAULT 0,

    INDEX `taxonomy`(`taxonomy`),
    UNIQUE INDEX `term_id_taxonomy`(`term_id`, `taxonomy`),
    PRIMARY KEY (`term_taxonomy_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_termmeta` (
    `meta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `term_id` INTEGER NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `term_id`(`term_id`),
    PRIMARY KEY (`meta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_terms` (
    `term_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL DEFAULT '',
    `slug` VARCHAR(200) NOT NULL DEFAULT '',
    `term_group` INTEGER NOT NULL DEFAULT 0,

    INDEX `name`(`name`(191)),
    INDEX `slug`(`slug`(191)),
    PRIMARY KEY (`term_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_usermeta` (
    `umeta_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL DEFAULT 0,
    `meta_key` VARCHAR(255) NULL,
    `meta_value` LONGTEXT NULL,

    INDEX `meta_key`(`meta_key`(191)),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`umeta_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wp_users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `user_login` VARCHAR(60) NOT NULL DEFAULT '',
    `user_pass` VARCHAR(255) NOT NULL DEFAULT '',
    `user_nicename` VARCHAR(50) NOT NULL DEFAULT '',
    `user_email` VARCHAR(100) NOT NULL DEFAULT '',
    `user_url` VARCHAR(100) NOT NULL DEFAULT '',
    `user_registered` DATETIME(0) NOT NULL DEFAULT ('0000-00-00 00:00:00'),
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
    `action_id` INTEGER NOT NULL AUTO_INCREMENT,
    `note_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `query` LONGTEXT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN NOT NULL DEFAULT false,
    `actioned_text` VARCHAR(255) NOT NULL,

    INDEX `note_id`(`note_id`),
    PRIMARY KEY (`action_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `wp_postmeta` ADD CONSTRAINT `wp_postmeta_post_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `wp_posts`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `wp_usermeta` ADD CONSTRAINT `wp_usermeta_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `wp_users`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

