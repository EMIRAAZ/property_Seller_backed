const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Blog = sequelize.define(
  'blog',
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
    mainTitle: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(2000),
      allowNull: false,
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

module.exports = Blog;
