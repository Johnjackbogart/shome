CREATE TABLE "interest_signups" (
	"email" text PRIMARY KEY NOT NULL,
	"waitlist" boolean DEFAULT false NOT NULL,
	"newsletter" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
