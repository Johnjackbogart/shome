ALTER TABLE "user" ADD COLUMN "border_style" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "border_radius" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "border_line_style" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "background_color" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "font" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "font_color" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "secondary_text_color" text;--> statement-breakpoint
UPDATE "user"
SET
	"border_style" = "default_post_style" ->> 'borderStyle',
	"border_radius" = "default_post_style" ->> 'borderRadius',
	"border_line_style" = "default_post_style" ->> 'borderLineStyle',
	"background_color" = "default_post_style" ->> 'backgroundColor',
	"font" = "default_post_style" ->> 'font',
	"font_color" = "default_post_style" ->> 'fontColor',
	"secondary_text_color" = "default_post_style" ->> 'secondaryTextColor';--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN "default_post_style";
