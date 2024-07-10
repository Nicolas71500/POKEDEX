import { sequelize } from "../database.js";  
import { DataTypes, Model } from 'sequelize';
import { Team } from './team.js'; // Assurez-vous d'importer le modèle Team

export class Pokemon extends Model {}

Pokemon.init({      
    id: {        
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },      
    name: {        
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },      
    hp: {        
        type: DataTypes.INTEGER,
        allowNull: false,
    },      
    atk: {        
        type: DataTypes.INTEGER,
        allowNull: false,
    },      
    def: {        
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
    def_spe: {        
        type: DataTypes.INTEGER,
        allowNull: false,
    }, 
     atk_spe: {        
        type: DataTypes.INTEGER,
        allowNull: false,
    }, speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },  
},                                          
{
    sequelize, 
        modelName: 'pokemon', 
        tableName: 'pokemon', 
        timestamps: false,  
})                                              


    

