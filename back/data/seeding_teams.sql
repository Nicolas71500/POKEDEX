BEGIN; 

INSERT INTO "team" ("name", "description") 

VALUES ( 'Ultimate Team', 'La meilleure team du monde'), ( 'La Team de l''enfer', 'Le feuuuuu'), ( 'Squad fofolle', 'Pour tout gagner') ; 

INSERT INTO "team_pokemon" ("pokemon_id", "team_id")

VALUES 
(3,10), 
(6,10), 
(9,10), 
(12,10),
(15,10),
(34,10),
(6,2),
(38,2),
(59,2),
(126,2),
(136,2),
(146,2),
(151,11),
(150,11),
(149,11),
(146,11),
(145,11),
(144,11);


COMMIT;