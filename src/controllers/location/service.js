const Address = require('../../models/Address');
const sequelize = require('../../database/dbConnection');

async function searchLocationService(location) {
  const loc = location.toLowerCase();
  const locations = await sequelize.query(
    `SELECT * FROM address WHERE LOWER("placeAddress") LIKE '%${loc}%' OR LOWER("building") LIKE '%${loc}%' OR LOWER("city") LIKE '%${loc}%'`,
    {
      model: Address,
      mapToModel: true,
    }
  );
  return locations;
}

module.exports = {
  searchLocationService,
};
