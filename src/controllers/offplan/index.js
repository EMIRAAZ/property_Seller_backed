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
    emirate: body.emirate,
    ...(body.latitude ? { latitude: body.latitude } : {}),
    ...(body.longitude ? { longitude: body.longitude } : {}),
    ...(body.building ? { building: body.building } : {}),
  };

  const offplanBody = {
    id: generateUniqueID(),
    title: body.title,
    projectName: body.projectName,
    projectOverview: body.projectOverview,
    interiorDetails: body.interiorDetails,
    images: body.images,
    agentId: body.agentId,
    price: body.price,
    propertyType: body.propertyType,
    propertySize: body.propertySize,
    propertySizeUnit: body.propertySizeUnit,
    noOfBedroom: body.noOfBedroom,
    noOfBathroom: body.noOfBathroom,
    phone: body.phone,
    email: body.email,
    videoLink: body.videoLink,
    whatsapp: body.whatsapp,
    ...(body.priceForAvailability
      ? { priceForAvailability: body.priceForAvailability }
      : {}),
    ...(body.amenities ? { amenities: body.amenities } : {}),
    ...(body.paymentPlan ? { paymentPlan: body.paymentPlan } : {}),
    ...(body.whyThisProperty ? { whyThisProperty: body.whyThisProperty } : {}),
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
