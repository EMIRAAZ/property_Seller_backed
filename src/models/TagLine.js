const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const TagHeads = require('./TagHeads');

const TagLine = sequelize.define(
  'tagline',
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
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);

TagLine.belongsTo(TagHeads, {
  foreignKey: 'tagheadId',
  as: 'tagheads',
});

module.exports = TagLine;
