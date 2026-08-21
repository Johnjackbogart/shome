-- The original text column was never read or written by the application. Give
-- every existing account the product default while changing it to structured
-- JSON, rather than attempting to cast any manually-entered placeholder CSS.
ALTER TABLE "user" ALTER COLUMN "default_post_style" SET DATA TYPE jsonb USING '{"borderStyle":"#ffffff","borderRadius":"16px","borderLineStyle":"solid","backgroundColor":"#0f172a","font":"sans-serif","fontColor":"#f8fafc","secondaryTextColor":"#94a3b8"}'::jsonb;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "default_post_style" SET DEFAULT '{"borderStyle":"#ffffff","borderRadius":"16px","borderLineStyle":"solid","backgroundColor":"#0f172a","font":"sans-serif","fontColor":"#f8fafc","secondaryTextColor":"#94a3b8"}'::jsonb;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "default_post_style" SET NOT NULL;
