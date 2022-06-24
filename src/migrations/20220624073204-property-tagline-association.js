'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('property', 'taglineId', {
      type: Sequelize.STRING(40),
      references: {
        model: 'tagline',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'property',
      'taglineId' // key we want to remove
    );
  },
};
