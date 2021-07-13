CREATE DATABASE "epic-reminder-db";

CREATE USER "epic-reminder" WITH ENCRYPTED PASSWORD 'training2021';

GRANT ALL PRIVILEGES ON DATABASE "epic-reminder-db" to "epic-reminder";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
