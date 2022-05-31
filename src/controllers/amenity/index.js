const { generateUniqueID } = require('../../utils');
const amenityService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addAmenity(req, res) {
  const body = { ...req.body };

  const amenityBody = {
    id: generateUniqueID(),
    ...(body.amenityLogo ? { amenityLogo: body.amenityLogo } : {}),
    name: body.name,
  };

  const amenity = await amenityService.addAmenityService(amenityBody);

  return res.status(201).json({
    status: 201,
    message: 'Amenit added successfully',
    data: [amenity],
  });
}

async function listAmenity(req, res) {
  const query = { ...req.query };
  const amenities = await amenityService.listAmenityService(query);
  return res.status(200).json({ status: 200, data: amenities });
}

async function listAmenityById(req, res) {
  const { id } = req.params;

  const amenity = await amenityService.listAmenityByIdService(id);
  return res.status(200).json({ status: 200, data: [amenity] });
}

async function updateAmenityById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const amenity = await amenityService.updateAmenityById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Amenity',
    data: [amenity],
  });
}

async function deleteAmenityById(req, res) {
  const { id } = req.params;
  await amenityService.deleteAmenityById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Amenity',
  });
}

module.exports = {
  addAmenity: [verify, authRole(['ADMIN', 'AGENT']), addAmenity],
  listAmenity: [verify, authRole(['ADMIN', 'AGENT']), listAmenity],
  listAmenityById: [verify, authRole(['ADMIN', 'AGENT']), listAmenityById],
  updateAmenityById: [verify, authRole(['ADMIN']), updateAmenityById],
  deleteAmenityById: [verify, authRole(['ADMIN']), deleteAmenityById],
};
