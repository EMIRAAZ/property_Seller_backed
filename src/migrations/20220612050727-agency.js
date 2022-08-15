'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('agency', {
      id: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        default: 'ADMIN',
      },
      agencyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agencyLogo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      tradeLicenseNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      brn: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      whatsAppNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      officeAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ownerName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('agency');
  },
};
