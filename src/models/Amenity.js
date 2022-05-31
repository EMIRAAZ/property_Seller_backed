const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Amenity = sequelize.define(
  'amenity',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    amenityLogo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Amenity;
