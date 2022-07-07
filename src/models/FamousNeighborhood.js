const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const FamousNeighborhood = sequelize.define(
  'famousneighborhood',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emirate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);

module.exports = FamousNeighborhood;
