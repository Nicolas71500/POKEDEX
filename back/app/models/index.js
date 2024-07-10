import { Pokemon } from "./pokemon.js";
import { Team } from "./team.js";
import { Type } from "./type.js";
import { sequelize } from "../database.js";

Pokemon.belongsToMany(Type, {
    as : "types",
    through:"pokemon_type",
    foreignKey:'pokemon_id'
});

Type.belongsToMany(Pokemon, {
    as: "pokemons",
    through:"pokemon_type",
    foreignKey:"type_id"
});

Pokemon.belongsToMany(Team, {
    as: "teams",
    through:"team_pokemon",
    foreignKey: "pokemon_id",
})

Team.belongsToMany(Pokemon, {
    as:"pokemons",
    through:"team_pokemon",
    foreignKey:"team_id"
});

sequelize.sync({ alter: true });

export { Pokemon, Type, Team, sequelize };