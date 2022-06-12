const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Agency = sequelize.define(
  'agency',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    agencyName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    agencyLogo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Agency;
