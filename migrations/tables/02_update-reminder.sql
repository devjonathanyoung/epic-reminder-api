ALTER TABLE reminder ADD comment text;

-- Ajoute une contrainte pour avoir des duos name/type uniques (pas de doublon)
ALTER TABLE reminder ADD CONSTRAINT uniqueNameType UNIQUE (name, type)