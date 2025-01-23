CREATE TABLE `credentials` (
	`user_id` integer NOT NULL,
	`id` text NOT NULL,
	`public_key` text NOT NULL,
	`counter` integer NOT NULL,
	`backup` integer NOT NULL,
	`transports` text NOT NULL,
	PRIMARY KEY(`user_id`, `id`),
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_id_unique` ON `credentials` (`id`);--> statement-breakpoint
CREATE TABLE `orgs` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`otp_secret` integer,
	`subdomain` text NOT NULL,
	`confirmed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `orgs_email_unique` ON `orgs` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `orgs_subdomain_unique` ON `orgs` (`subdomain`);--> statement-breakpoint
ALTER TABLE `users` ADD `public_key` text;--> statement-breakpoint
ALTER TABLE `users` ADD `last_login_at` integer;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `otp_secret`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `passkey_public_key`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `provider`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `confirmed`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `last_active`;