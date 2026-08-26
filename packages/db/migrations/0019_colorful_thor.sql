ALTER TABLE "user" ADD COLUMN "app_background_color" text DEFAULT '#070a18' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_border_color" text DEFAULT '#24293a' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_border_radius" text DEFAULT '16px' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_border_line_style" text DEFAULT 'solid' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_font" text DEFAULT 'sans-serif' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_font_color" text DEFAULT '#f8fafc' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_secondary_text_color" text DEFAULT '#94a3b8' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_override_post_styles" boolean DEFAULT false NOT NULL;--> statement-breakpoint
UPDATE "user"
SET
	"app_background_color" = COALESCE("app_style"->>'backgroundColor', '#070a18'),
	"app_border_color" = COALESCE("app_style"->>'borderColor', '#24293a'),
	"app_border_radius" = COALESCE("app_style"->>'borderRadius', '16px'),
	"app_border_line_style" = COALESCE("app_style"->>'borderLineStyle', 'solid'),
	"app_font" = COALESCE("app_style"->>'font', 'sans-serif'),
	"app_font_color" = COALESCE("app_style"->>'fontColor', '#f8fafc'),
	"app_secondary_text_color" = COALESCE("app_style"->>'secondaryTextColor', '#94a3b8'),
	"app_override_post_styles" = CASE
		WHEN jsonb_typeof("app_style"->'overridePostStyles') = 'boolean'
			THEN ("app_style"->>'overridePostStyles')::boolean
		ELSE false
	END;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "app_style";
