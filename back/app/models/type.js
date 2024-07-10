import { Model } from 'sequelize';
import { sequelize } from '../database.js';  
import { DataTypes } from 'sequelize';

export class Type extends Model {}

Type.init({      
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
  color: {                                 
    type: DataTypes.STRING,                 
    allowNull: false,                       
  }                                        
},                                        
{                                          
  sequelize,                               
  modelName: 'type',
  tableName: 'type', 
  timestamps: false,

});                                     



