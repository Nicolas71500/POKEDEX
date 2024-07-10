import { Team } from "../models/index.js";
import { Pokemon } from "../models/index.js";
import { Type } from "../models/index.js";
import { sequelize } from "../database.js";

export const getTeams = async (req, res) => {
    try {
        const allTeams = await Team.findAll();
        res.status(200).json(allTeams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getTeamById = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        res.status(200).json(team);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const createTeam = async (req, res) => {
    try {
        const newTeam = await Team.create(req.body);
        res.status(201).json(newTeam);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        await team.update(req.body);
        res.status(200).json(team);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        const team = await Team.findByPk(req.params.id);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        await team.destroy();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export async function getAllTeamsAndPokemons(req, res){
    const teams = await Team.findAll({
        include: 'pokemons'
    });
    if(!teams) return res.status(404).json('Pas de team en bdd');
    res.status(200).json(teams);
}

export async function getOneTeamAndPokemons(req, res) {
    const { id } = req.params;
    try {
        const team = await Team.findByPk(Number(id), {
            include: [{
                model: Pokemon,
                as: 'pokemons',
                include: {
                    model: Type,
                    as: 'types'
                }
            }]
        });

        if (!team) return res.status(404).json(`Pas de team à l'id : ${id}`);
        res.status(200).json(team);
    } catch (error) {
        console.error('Error fetching team and pokemons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export async function addPokemonToTeam(req, res) {
    const { teamId, pokemonId } = req.body;

    try {
        console.log(`Received request to add Pokemon with ID ${pokemonId} to Team with ID ${teamId}`);
        
        const team = await Team.findByPk(teamId);
        const pokemon = await Pokemon.findByPk(pokemonId);

        if (!team) {
            console.log(`Team with ID ${teamId} not found`);
            return res.status(404).json({ message: "Team not found" });
        }

        if (!pokemon) {
            console.log(`Pokemon with ID ${pokemonId} not found`);
            return res.status(404).json({ message: "Pokemon not found" });
        }

        await team.addPokemon(pokemon);
        console.log(`Added Pokemon with ID ${pokemonId} to Team with ID ${teamId}`);
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}




export const removePokemonFromTeam = async (req, res) => {
    
    try {
        const team = await Team.findByPk(req.params.teamId);
        const pokemon = await Pokemon.findByPk(req.params.pokemonId);
        if (!team) {
            console.log(`Team with ID ${req.params.teamId} not found`);
            return res.status(404).json({ message: "Team not found" });
        }
        if (!pokemon) {
            console.log(`Pokemon with ID ${req.params.pokemonId} not found`);
            return res.status(404).json({ message: "Pokemon not found" });
        }
        await team.removePokemon(pokemon);
        console.log(`Removed Pokemon with ID ${req.params.pokemonId} from Team with ID ${req.params.teamId}`);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const updateTeamOrder = async (req, res) => {

    const { order } = req.body;
    if (!order || !Array.isArray(order)) {
        return res.status(400).json({ message: "Invalid input data" });
    }
    // Valider que tous les éléments de la commande sont présents
    const teams = await Team.findAll();
    if (teams.length !== order.length) {
        return res.status(400).json({ message: "Mismatch between team count and order length" });
    }
    // Mettre à jour l'ordre pour chaque équipe
    for (let i = 0; i < order.length; i++) {
        const team = teams.find(team => team.id === order[i]);
        if (!team) {
            return res.status(400).json({ message: `Team with id ${order[i]} not found` });
                }
        team.order = i; // Assigner l'ordre basé sur la position dans le tableau
        await team.save();
    }
    res.status(200).json({ message: "Team order updated successfully" });

}




    


