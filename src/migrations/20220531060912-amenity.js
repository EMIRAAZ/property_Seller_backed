'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('amenity', {
      id: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      amenityLogo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('amenity');
  },
};
