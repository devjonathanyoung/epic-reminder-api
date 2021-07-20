CREATE DATABASE "epic-reminder-db";

-- Replace "UserName" and "Password" by your own login credentials
CREATE USER "NomUtilisateur" WITH ENCRYPTED PASSWORD "MotDePasse";

GRANT ALL PRIVILEGES ON DATABASE "epic-reminder-db" to "epic-reminder";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
