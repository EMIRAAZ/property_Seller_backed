const Sequelize = require('sequelize');
const sequelize = require('../database/dbConnection');

const Address = sequelize.define(
  'address',
  {
    id: {
      type: Sequelize.STRING(12),
      allowNull: false,
      primaryKey: true,
    },
    placeAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    building: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // emirate: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    // },
    latitude: {
      type: Sequelize.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: Sequelize.DECIMAL(11, 8),
      allowNull: true,
    },
 
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  },
  {
    freezeTableName: true,
  }
);


// sequelize.sync({force:true})
//   .then(() => {
//     console.log('Database and tables synced');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });




module.exports = Address;
