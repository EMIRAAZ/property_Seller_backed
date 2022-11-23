'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('offplan', 'addressId', {
      type: Sequelize.STRING(40),
      references: {
        model: 'address',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.removeColumn(
    //   'offplan',
    //   'addressId'
    //   // key we want to remove
    // );
  },
};
