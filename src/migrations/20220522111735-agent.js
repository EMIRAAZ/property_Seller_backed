'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('agent', {
      id: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      agentName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agentImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      yearsOfExperience: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      agencyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      agenyLogo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      freezeTableName: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('agent');
  },
};
