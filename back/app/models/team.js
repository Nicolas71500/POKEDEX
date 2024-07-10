
import { sequelize } from '../database.js';  
import { DataTypes, Model } from 'sequelize';

export class Team extends Model {}

Team.init({      
    id: {        
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },      
    name: {        
        type: DataTypes.STRING,
        allowNull: false,
    },      
    description: {        
        type: DataTypes.TEXT,
        allowNull: true,
    }, 

},
{                                          
    sequelize, 
    modelName: 'team', 
    tableName: 'team', 
    timestamps: false,                      
  });  