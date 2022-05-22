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
        type: Sequelize.STRING,
        allowNull: false,
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      videoView: {
        type: Sequelize.ARRAY(Sequelize.STRING),
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
        type: Sequelize.ARRAY(Sequelize.STRING),
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
      agentORN: {
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
      noOfSave: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      noOfShare: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      noOfReport: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      freezeTableName: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('property');
  },
};
