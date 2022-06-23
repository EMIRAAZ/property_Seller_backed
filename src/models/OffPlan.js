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
    description: {
      type: Sequelize.STRING(2000),
      allowNull: false,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      allowNull: false,
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.STRING(1000)),
      allowNull: true,
    },
    availability: {
      //[{noOfBedroom:4,type:"apartment",floorPlan:""}]
      type: Sequelize.ARRAY(Sequelize.JSON),
      allowNull: true,
    },
    paymentPlan: {
      type: Sequelize.ARRAY(Sequelize.STRING(200)),
      allowNull: true,
    },
    brochurePDF: {
      type: Sequelize.STRING(2000),
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
