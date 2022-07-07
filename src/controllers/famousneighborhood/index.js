const { generateUniqueID } = require('../../utils');
const famousneighborhoodService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addFamousNeighborhood(req, res) {
  const body = { ...req.body };

  const famousneighborhoodBody = {
    id: generateUniqueID(),
    title: body.title,
    emirate: body.emirate,
    images: body.images,
  };

  const famousneighborhood =
    await famousneighborhoodService.addFamousNeighborhoodService(
      famousneighborhoodBody
    );

  return res.status(201).json({
    status: 201,
    message: 'Off Plan added successfully',
    data: [famousneighborhood],
  });
}

async function listFamousNeighborhood(req, res) {
  const query = { ...req.query };
  const properties =
    await famousneighborhoodService.listFamousNeighborhoodService(query);
  return res.status(200).json({ status: 200, data: properties });
}

async function listFamousNeighborhoodById(req, res) {
  const { id } = req.params;

  const famousneighborhood =
    await famousneighborhoodService.listFamousNeighborhoodByIdService(id);
  return res.status(200).json({ status: 200, data: famousneighborhood });
}

async function updateFamousNeighborhoodById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const famousneighborhood =
    await famousneighborhoodService.updateFamousNeighborhoodById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated famous neighborhood',
    data: [famousneighborhood],
  });
}

async function deleteFamousNeighborhoodById(req, res) {
  const { id } = req.params;
  await famousneighborhoodService.deleteFamousNeighborhoodById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted famous neighborhood',
  });
}

module.exports = {
  addFamousNeighborhood: [
    verify,
    authRole(['ADMIN', 'AGENT']),
    addFamousNeighborhood,
  ],
  listFamousNeighborhood: [listFamousNeighborhood],
  listFamousNeighborhoodById: [listFamousNeighborhoodById],
  updateFamousNeighborhoodById: [
    verify,
    authRole(['ADMIN']),
    updateFamousNeighborhoodById,
  ],
  deleteFamousNeighborhoodById: [
    verify,
    authRole(['ADMIN']),
    deleteFamousNeighborhoodById,
  ],
};
