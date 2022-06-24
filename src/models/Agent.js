const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');
const Agency = require('./Agency');

const Agent = sequelize.define(
  'agent',
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
      default: 'AGENT',
    },
    agentName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    agentImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    yearsOfExperience: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    languages: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
    rera: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    orn: {
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);
Agent.belongsTo(Agency, {
  foreignKey: 'agencyId',
  as: 'agency',
});

module.exports = Agent;
