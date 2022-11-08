'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('offplan', {
      id: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectOverview: {
        type: Sequelize.STRING(50000),
        allowNull: false,
      },
      interiorDetails: {
        type: Sequelize.STRING(50000),
        allowNull: false,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING(2000)),
        allowNull: false,
      },
      price: {
        type: Sequelize.ARRAY(Sequelize.STRING(500)),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whatsapp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      videoLink: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      propertyType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      propertySize: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      propertySizeUnit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      noOfBedroom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      noOfBathroom: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceForAvailability: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },
      paymentPlan: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },
      whyThisProperty: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('offplan');
  },
};
