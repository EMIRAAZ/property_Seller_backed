const { generateUniqueID } = require('../../utils');
const cityService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function listCity(req, res) {
  const cities = await cityService.listCityService();
  return res.status(200).json({ status: 200, data: cities });
}

async function listCityById(req, res) {
  const { id } = req.params;
  const cities = await cityService.listCityByIdService(id);
  return res.status(200).json({ status: 200, data: cities });
}

async function listCityByEmirate(req, res) {
  const query = { ...req.query };
  const cities = await cityService.listCityByEmirate(query.emirate);
  return res.status(200).json({ status: 200, data: cities });
}

async function addCity(req, res) {
  const body = { ...req.body };
  const cityBody = {
    id: generateUniqueID(),
    name: body.name,
    // emirate: body.emirate,
  };
  const city = await cityService.addCityService(cityBody);
  return res.status(201).json({
    status: 201,
    message: 'City added successfully',
    data: [city],
  });
}

async function updateCityById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const city = await cityService.updateCityById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated City',
    data: [city],
  });
}

async function deleteCityById(req, res) {
  const { id } = req.params;
  await cityService.deleteCityById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted City',
  });
}

module.exports = {
  listCity: [listCity],
  addCity: [verify, authRole(['ADMIN']), addCity],
  updateCity: [verify, authRole(['ADMIN']), updateCityById],
  deleteCity: [verify, authRole(['ADMIN']), deleteCityById],
  listCityByEmirate: [listCityByEmirate],
  listCityById: [listCityById],
};
