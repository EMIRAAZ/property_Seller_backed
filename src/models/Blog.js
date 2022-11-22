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
    description: {
      type: Sequelize.STRING(50000),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(50000),
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
