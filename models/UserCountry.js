const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class UserCountry extends Model { }

//Keeps track of movies that user want to add to a watch list or if we have time add to a favorites list

UserCountry.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    country_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'country',
        key: 'id',
      }
    },
    has_visited: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_country',
  }
);

module.exports = UserCountry;
