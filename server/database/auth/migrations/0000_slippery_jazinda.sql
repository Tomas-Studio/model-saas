CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`tenant_id` text NOT NULL,
	`otp_secret` integer,
	`passkey_public_key` text,
	`provider` text,
	`registered` integer DEFAULT false NOT NULL,
	`confirmed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer NOT NULL,
	`last_active` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);