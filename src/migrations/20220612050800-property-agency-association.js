'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('property', 'agencyId', {
      type: Sequelize.STRING(40),
      allowNull: true,
      references: {
        model: 'agency',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn(
    //   'property',
    //   'agencyId' // key we want to remove
    // );
  },
};
