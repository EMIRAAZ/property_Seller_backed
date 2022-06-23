const { generateUniqueID } = require('../../utils');
const offplanService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addOffplan(req, res) {
  const body = { ...req.body };

  const addressBody = {
    id: generateUniqueID(),
    placeAddress: body.placeAddress,
    city: body.city,
    ...(body.building ? { building: body.building } : {}),
    ...(body.latitude ? { latitude: body.latitude } : {}),
    ...(body.longitude ? { longitude: body.longitude } : {}),
  };

  const offplanBody = {
    id: generateUniqueID(),
    title: body.title,
    description: body.description,
    images: body.images,
    agentId: body.agentId,
    ...(body.availability ? { availability: body.availability } : {}),
    ...(body.amenities ? { amenities: body.amenities } : {}),
    ...(body.paymentPlan ? { paymentPlan: body.paymentPlan } : {}),
    ...(body.brochurePDF ? { brochurePDF: body.brochurePDF } : {}),
  };

  const offplan = await offplanService.addOffplanService(
    addressBody,
    offplanBody
  );

  return res.status(201).json({
    status: 201,
    message: 'Off Plan added successfully',
    data: [offplan],
  });
}

async function listOffplan(req, res) {
  const query = { ...req.query };
  const properties = await offplanService.listOffplanService(query);
  return res.status(200).json({ status: 200, data: properties });
}

async function listOffplanById(req, res) {
  const { id } = req.params;

  const offplan = await offplanService.listOffplanByIdService(id);
  return res.status(200).json({ status: 200, data: offplan });
}

async function updateOffplanById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const offplan = await offplanService.updateOffplanById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Off Plan',
    data: [offplan],
  });
}

async function deleteOffplanById(req, res) {
  const { id } = req.params;
  await offplanService.deleteOffplanById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Off Plan',
  });
}

module.exports = {
  addOffplan: [verify, authRole(['ADMIN', 'AGENT']), addOffplan],
  listOffplan: [listOffplan],
  listOffplanById: [listOffplanById],
  updateOffplanById: [verify, authRole(['ADMIN']), updateOffplanById],
  deleteOffplanById: [verify, authRole(['ADMIN']), deleteOffplanById],
};
