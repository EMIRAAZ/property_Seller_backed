const sequelize = require('../../database/dbConnection');
const Amenity = require('../../models/Amenity');

async function addAmenityService(amenityBody) {
  const amenity = await Amenity.create(amenityBody);
  return amenity;
}

async function listAmenityService(query) {
  const amenity = await Amenity.findAndCountAll();

  return amenity;
}

async function listAmenityByIdService(id) {
  const amenity = await Amenity.findByPk(id);
  return amenity;
}

async function updateAmenityById(id, body) {
  const amenity = await Amenity.update({ ...body }, { where: { id: id } });
  return amenity;
}

async function deleteAmenityById(id) {
  const amenity = await Amenity.destroy({ where: { id: id } });
  return amenity;
}

module.exports = {
  addAmenityService,
  listAmenityByIdService,
  listAmenityService,
  updateAmenityById,
  deleteAmenityById,
};
