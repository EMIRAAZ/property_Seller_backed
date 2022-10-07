const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const News = sequelize.define(
  'news',
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
    description: {
      type: Sequelize.STRING(50000),
      allowNull: false,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      allowNull: false,
    },
    topics: {
      type: Sequelize.ARRAY(Sequelize.STRING(1000)),
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);

module.exports = News;
