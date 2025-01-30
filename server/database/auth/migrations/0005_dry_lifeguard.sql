DROP INDEX "credentials_id_unique";--> statement-breakpoint
DROP INDEX "orgs_email_unique";--> statement-breakpoint
DROP INDEX "orgs_subdomain_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "last_login_at" TO "last_login_at" integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `credentials_id_unique` ON `credentials` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `orgs_email_unique` ON `orgs` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `orgs_subdomain_unique` ON `orgs` (`subdomain`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `public_key`;