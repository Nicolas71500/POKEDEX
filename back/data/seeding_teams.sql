BEGIN;
INSERT INTO "team"
  ("name", "description")
VALUES
  ( 'Ultimate Team', 'La meilleure team du monde'),
  ( 'La Team de l''enfer', 'Le feuuuuu'),
  ( 'Squad fofolle', 'Pour tout gagner')
;
INSERT INTO "team_pokemon"
    ("pokemon_id", "team_id")
VALUES
(3,1),
(6,1),
(9,1),
(12,1),
(15,1),
(34,1),
(6,1),
(38,1),
(59,1),
(126,3),
(136,3),
(146,3),
(151,3),
(150,3),
(149,3),
(146,3),
(145,3),
(144,3);
COMMIT;