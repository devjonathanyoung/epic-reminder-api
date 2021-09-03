ALTER TABLE "user" ADD COLUMN username text NOT NULL;
ALTER TABLE "user" ADD CONSTRAINT uniqueUsername UNIQUE (username);