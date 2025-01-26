DROP INDEX "credentials_id_unique";--> statement-breakpoint
DROP INDEX "orgs_email_unique";--> statement-breakpoint
DROP INDEX "orgs_subdomain_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `orgs` ALTER COLUMN "otp_secret" TO "otp_secret" text;--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_id_unique` ON `credentials` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `orgs_email_unique` ON `orgs` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `orgs_subdomain_unique` ON `orgs` (`subdomain`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);