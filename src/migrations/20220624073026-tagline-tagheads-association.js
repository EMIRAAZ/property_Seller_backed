'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('tagline', 'tagheadId', {
      type: Sequelize.STRING(40),
      references: {
        model: 'tagheads',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn(
    //   'tagline',
    //   'tagheadId' // key we want to remove
    // );
  },
};
