-- Modifier la contrainte de clé étrangère pour activer la suppression en cascade
ALTER TABLE team_pokemon
DROP CONSTRAINT team_pokemon_team_id_fkey,
ADD CONSTRAINT team_pokemon_team_id_fkey
FOREIGN KEY (team_id)
REFERENCES team(id)
ON DELETE CASCADE;