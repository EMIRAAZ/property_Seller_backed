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
      default: 'AGENCY',
    },
    agencyName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    agencyLogo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    tradeLicenseNo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    brn: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    whatsAppNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    officeAddress: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ownerName: {
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
