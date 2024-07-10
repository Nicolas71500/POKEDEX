import { Router } from "express";
import * as  pokemonController  from "./controllers/pokemonController.js";
import * as  typeController  from "./controllers/typeController.js";
import * as   teamController  from "./controllers/teamController.js";



export const router = Router();

router.get("/pokemons", pokemonController.getPokemons);
router.get("/pokemons/:id", pokemonController.getPokemonById);
router.post("/pokemons/:id/votes", pokemonController.addPokemonVote);
router.get("/pokemons/leaderboard", pokemonController.getPokemonLeaderboard);



router.get("/teams", teamController.getTeams);
router.get("/teams/:id", teamController.getTeamById);
router.post("/teams", teamController.createTeam);
router.put("/teams/:id", teamController.updateTeam);
router.delete("/teams/:id", teamController.deleteTeam);
router.put("/teams/:id/pokemons/:id", teamController.addPokemonToTeam);
router.delete('/teams/:teamId/pokemons/:pokemonId', teamController.removePokemonFromTeam);
router.get ("/teams/pokemons", teamController.getAllTeamsAndPokemons);
router.get('/teams/:id/pokemons', teamController.getOneTeamAndPokemons)
router.put("/teams/order", teamController.updateTeamOrder);



router.get("/types", typeController.getTypes);
router.get("/types/:id", typeController.getTypeById);
router.get("/types/:id/pokemons", typeController.getPokemonsByType);





