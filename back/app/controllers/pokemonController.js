import { Pokemon } from "../models/pokemon.js";
import { Sequelize } from 'sequelize';


export const getPokemons = async (req, res) => {
    try {
        const allPokemons = await Pokemon.findAll();
        res.status(200).json(allPokemons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPokemonById = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findByPk(id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon not found" });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const addPokemonVote = async (req, res) => {
    try {
        const { id } = req.params;
        const pokemon = await Pokemon.findByPk(id);
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon not found" });
        }
        pokemon.increment("votes", { by: 1 });
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPokemonLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Pokemon.findAll({
            order: [["votes", "DESC"]],
            limit: 10,
        });
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getpokemonbyname = async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({
            where: {
                name: {
                    [Sequelize.Op.iLike]: req.params.name
                }
            }
        });
        if (!pokemon) {
            return res.status(404).json({ message: "Pokemon not found" });
        }
        res.status(200).json(pokemon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



