const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Admin = sequelize.define(
  'admin',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      default: 'ADMIN',
    },
    adminName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    adminImage: {
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

module.exports = Admin;
