const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Agent = require('./Agent');
const Agency = require('./Agency');
const Address = require('./Address');

const Property = sequelize.define(
  'property',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // mainTitle: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    description: {
      type: Sequelize.STRING(50000),
      allowNull: false,
    },
    images: {
      type: Sequelize.ARRAY(Sequelize.STRING(2000)),
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
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
    // propertyCategory: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    propertySize: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    // propertySizeUnit: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    // propertyAge: {
    //   type: Sequelize.FLOAT,
    //   allowNull: false,
    // },
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
    neighborhood: {
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
    offplan: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      default: false,
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
    readyToMove: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
    tagline: {
      type: Sequelize.ARRAY(Sequelize.STRING(1000)),
      allowNull: true,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    locationLinkOfGoogleMap: {
      type: Sequelize.STRING(50000),
      allowNull: true,
    },
  
  },
 
  {
    freezeTableName: true,
  }
);

Property.belongsTo(Agent, {
  foreignKey: 'agentId',
  as: 'agent',
  allowNull: false,
});

Property.belongsTo(Address, {
  foreignKey: 'addressId',
  as: 'address',
});
Property.belongsTo(Agency, {
  foreignKey: 'agencyId',
  as: 'agency',
  allowNull: true,
});


sequelize.sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });


// Property.sync({force:true})

module.exports = Property;
