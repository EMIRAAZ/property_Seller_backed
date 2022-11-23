'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('property', 'agentId', {
      type: Sequelize.STRING(40),
      allowNull: true,
      references: {
        model: 'agent',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn(
    //   'property',
    //   'agentId' // key we want to remove
    // );
  },
};
