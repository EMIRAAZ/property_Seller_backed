const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const City = sequelize.define(
  'city',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    emirate: {
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

module.exports = City;
