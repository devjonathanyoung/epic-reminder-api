ALTER TABLE reminder ADD comment text;

-- Add a constraint to have unique name/type couples (to avoid duplicates)
ALTER TABLE reminder ADD CONSTRAINT uniqueNameType UNIQUE (name, type)
