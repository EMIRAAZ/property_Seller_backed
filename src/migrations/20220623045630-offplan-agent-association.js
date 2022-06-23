'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('offplan', 'agentId', {
      type: Sequelize.STRING(40),
      references: {
        model: 'agent',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'offplan',
      'agentId' // key we want to remove
    );
  },
};
