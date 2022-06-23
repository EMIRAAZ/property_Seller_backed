'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('property', 'neighborhoodId', {
      type: Sequelize.STRING(40),
      references: {
        model: 'famousneighborhood',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'property',
      'neighborhoodId' // key we want to remove
    );
  },
};
