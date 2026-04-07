-- CreateIndex
CREATE INDEX `TripParticipant_trip_id_report_date` ON `TripParticipant`(`trip_id`, `report_date`);

-- CreateIndex
CREATE INDEX `meta_key_post_id` ON `wp_postmeta`(`meta_key`(191), `post_id`);

-- CreateIndex
CREATE INDEX `meta_key_user_id` ON `wp_usermeta`(`meta_key`(191), `user_id`);
