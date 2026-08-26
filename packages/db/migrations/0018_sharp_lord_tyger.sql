ALTER TABLE "user" ALTER COLUMN "app_style" SET DEFAULT '{"backgroundColor":"#070a18","borderColor":"#24293a","borderRadius":"16px","borderLineStyle":"solid","font":"sans-serif","fontColor":"#f8fafc","secondaryTextColor":"#94a3b8","overridePostStyles":false}'::jsonb;--> statement-breakpoint
UPDATE "user"
SET "app_style" = '{"backgroundColor":"#070a18","borderColor":"#24293a","borderRadius":"16px","borderLineStyle":"solid","font":"sans-serif","fontColor":"#f8fafc","secondaryTextColor":"#94a3b8","overridePostStyles":false}'::jsonb || "app_style";
