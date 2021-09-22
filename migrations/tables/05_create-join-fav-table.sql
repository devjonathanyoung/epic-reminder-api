CREATE TABLE reminder_fav (
  id uuid,
  "reminder_id" uuid NOT NULL,
  "user_id" uuid NOT NULL,
  PRIMARY KEY (id, "reminder_id", "user_id"),
  CONSTRAINT fk_reminder FOREIGN KEY("reminder_id") REFERENCES "reminder"(id),
  CONSTRAINT fk_user FOREIGN KEY("user_id") REFERENCES "user"(id)
);

GRANT ALL PRIVILEGES ON TABLE public.reminder_fav TO "epic-reminder";

ALTER TABLE public.reminder_fav
  ALTER COLUMN id SET DEFAULT uuid_generate_v4();