const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const AdvertiseClient = sequelize.define(
  'advertiseclient',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    propertyType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
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

module.exports = AdvertiseClient;
