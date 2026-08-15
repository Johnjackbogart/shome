CREATE TABLE "media_uploads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"content_type" text NOT NULL,
	"byte_size" integer NOT NULL,
	"duration_ms" integer,
	"original_name" text NOT NULL,
	"provider" text NOT NULL,
	"provider_asset_id" text NOT NULL,
	"status" text DEFAULT 'uploading' NOT NULL,
	"playback_url" text,
	"thumbnail_url" text,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "provider" text DEFAULT 'local' NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "provider_asset_id" text;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "status" text DEFAULT 'ready' NOT NULL;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "playback_url" text;--> statement-breakpoint
ALTER TABLE "post_media" ADD COLUMN "thumbnail_url" text;--> statement-breakpoint
ALTER TABLE "media_uploads" ADD CONSTRAINT "media_uploads_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "media_uploads_provider_asset_ux" ON "media_uploads" USING btree ("provider","provider_asset_id");--> statement-breakpoint
CREATE INDEX "media_uploads_user_status_created_ix" ON "media_uploads" USING btree ("user_id","status","created_at");