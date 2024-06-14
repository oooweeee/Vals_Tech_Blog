const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model {}

Project.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true,
    
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.STRING,
        }, 
        comment: {
            type: DataTypes.STRING,
          },
          userId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            }
          }
        },
        {
          sequelize,
          freezeTableName: true,
          underscored: true,
          modelName: 'project',
        }
      );
      
      module.exports = Project;