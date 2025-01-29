ALTER TABLE `users` RENAME COLUMN "tenant_id" TO "tenant";--> statement-breakpoint
ALTER TABLE `credentials` ADD `backedup` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `credentials` DROP COLUMN `backup`;