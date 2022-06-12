'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('property', {
      id: {
        type: Sequelize.STRING(12),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(2000),
        allowNull: false,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING(2000)),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      videoView: {
        type: Sequelize.STRING,
        allowNull: true,
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
      propertyAge: {
        type: Sequelize.FLOAT,
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
      amenities: {
        type: Sequelize.ARRAY(Sequelize.STRING(1000)),
        allowNull: true,
      },
      referenceNo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      trakheesiPermit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ownership: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      brokerORN: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      agentBRN: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      call: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whatsapp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      luxury: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      for: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'both',
      },
      noOfShare: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
      },
      noOfReport: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('property');
  },
};
