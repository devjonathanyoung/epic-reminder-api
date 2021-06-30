CREATE TABLE public.reminder
(
    id uuid,
    date timestamp with time zone,
    name text,
    type text,
    PRIMARY KEY (id)
);
ALTER TABLE public.reminder
    OWNER to "epic-reminder";
ALTER TABLE public.reminder
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();