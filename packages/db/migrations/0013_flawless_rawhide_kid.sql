ALTER TABLE "posts" RENAME COLUMN "content_style" TO "border_style";--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "background_color" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "font" text;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "font_color" text;