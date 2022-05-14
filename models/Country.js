const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Country extends Model { }

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country_img: {
      //this will be a URL 
      type: DataTypes.STRING,
      allowNull: false
    },
    review_ratings: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'country',
  }
);

module.exports = Country;
