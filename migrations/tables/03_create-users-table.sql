CREATE EXTENSION pgcrypto;

CREATE TABLE public.user
(
    id uuid,
    firstname text NOT NULL,
    lastname text NOT NULL,
    password text NOT NULL,
    PRIMARY KEY (id)
);
ALTER TABLE public.user
    OWNER to "epic-reminder";
ALTER TABLE public.user
    ALTER COLUMN id SET DEFAULT uuid_generate_v4();