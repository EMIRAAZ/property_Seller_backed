'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('agent', 'agencyId', {
      type: Sequelize.STRING(40),
      references: {
        model: 'agency',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'agent',
      'agencyId' // key we want to remove
    );
  },
};
