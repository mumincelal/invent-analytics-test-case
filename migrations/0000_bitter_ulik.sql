CREATE TABLE IF NOT EXISTS "borrow_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"book_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"borrow_date" timestamp with time zone DEFAULT now() NOT NULL,
	"return_date" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "books_name_unique" UNIQUE("name")
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "borrow_history_book_id_user_id_at_index" ON "borrow_history" USING btree ("book_id","user_id");