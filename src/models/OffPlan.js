const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Agent = require('./Agent');
const Address = require('./Address');

const OffPlan = sequelize.define(
  'offplan',
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
    projectName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectOverview: {
      type: Sequelize.STRING(50000),
      allowNull: false,
    },
    interiorDetails: {
      type: Sequelize.STRING(50000),
      allowNull: false,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      allowNull: false,
    },
    price: {
      type: Sequelize.ARRAY(Sequelize.STRING(500)),
      allowNull: false,
    },
    videoLink: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    propertyType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    propertySize: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    propertySizeUnit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    noOfBedroom: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    noOfBathroom: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    priceForAvailability: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true,
    },
    paymentPlan: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true,
    },
    whyThisProperty: {
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);

OffPlan.belongsTo(Agent, {
  foreignKey: 'agentId',
  as: 'agent',
});

OffPlan.belongsTo(Address, {
  foreignKey: 'addressId',
  as: 'address',
});

module.exports = OffPlan;
