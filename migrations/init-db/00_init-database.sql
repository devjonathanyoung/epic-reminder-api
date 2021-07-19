CREATE DATABASE "epic-reminder-db";

-- Remplacer "NomUtilisateur" et "MotDePasse" par vos identifiants
CREATE USER "NomUtilisateur" WITH ENCRYPTED PASSWORD "MotDePasse";

GRANT ALL PRIVILEGES ON DATABASE "epic-reminder-db" to "epic-reminder";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
