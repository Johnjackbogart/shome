ALTER TABLE "user" ADD COLUMN "app_background_color" text DEFAULT '#070a18' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_secondary_background_color" text DEFAULT '#0f172a' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_border_color" text DEFAULT '#24293a' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_border_radius" text DEFAULT '16px' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_border_line_style" text DEFAULT 'solid' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_font" text DEFAULT 'sans-serif' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_font_color" text DEFAULT '#f8fafc' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_secondary_text_color" text DEFAULT '#94a3b8' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_spacing" text DEFAULT '12px' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "app_override_post_styles" boolean DEFAULT false NOT NULL;