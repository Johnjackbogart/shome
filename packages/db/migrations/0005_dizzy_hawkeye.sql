CREATE TABLE "post_media" (
	"id" uuid PRIMARY KEY NOT NULL,
	"post_id" uuid NOT NULL,
	"type" text NOT NULL,
	"content_type" text NOT NULL,
	"byte_size" integer NOT NULL,
	"duration_ms" integer,
	"original_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "post_media_post_created_ix" ON "post_media" USING btree ("post_id","created_at");