import { Type } from "../models/type.js";


export const getTypes = async (req, res) => {
    try {
        const allTypes = await Type.findAll();
        res.status(200).json(allTypes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getTypeById = async (req, res) => { 
    try {
        const type = await Type.findByPk(req.params.id);
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.status(200).json(type);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPokemonsByType = async (req, res) => {
    try {
        const type = await Type.findByPk(req.params.id);
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
        const pokemons = await type.getPokemons();
        res.status(200).json(pokemons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

