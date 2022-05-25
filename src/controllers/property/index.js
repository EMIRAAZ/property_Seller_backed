const { generateUniqueID } = require('../../utils');
const propertyService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addProperty(req, res) {
  const body = { ...req.body };

  const addressBody = {
    id: generateUniqueID(),
    placeAddress: body.placeAddress,
    city: body.city,
    ...(body.building ? { building: body.building } : {}),
    ...(body.latitude ? { latitude: body.latitude } : {}),
    ...(body.longitude ? { longitude: body.longitude } : {}),
  };

  const propertyBody = {
    id: generateUniqueID(),
    title: body.title,
    description: body.description,
    images: body.images,
    price: body.price,
    propertyType: body.propertyType,
    propertySize: body.propertySize,
    propertySizeUnit: body.propertySizeUnit,
    propertyAge: body.propertyAge,
    noOfBedroom: body.noOfBedroom,
    noOfBathroom: body.noOfBathroom,
    call: body.call,
    email: body.email,
    whatsapp: body.whatsapp,
    featured: body.featured,
    luxury: body.luxury,
    for: body.for,
    noOfSave: body.noOfSave,
    noOfShare: body.noOfShare,
    noOfReport: body.noOfReport,
    agentId: body.agentId,
    ...(body.videoView ? { videoView: body.videoView } : {}),
    ...(body.amenities ? { amenities: body.amenities } : {}),
    ...(body.referenceNo ? { referenceNo: body.referenceNo } : {}),
    ...(body.trakheesiPermit ? { trakheesiPermit: body.trakheesiPermit } : {}),
    ...(body.ownership ? { ownership: body.ownership } : {}),
    ...(body.brokerORN ? { brokerORN: body.brokerORN } : {}),
    ...(body.agentBRN ? { agentBRN: body.agentBRN } : {}),
  };

  const property = await propertyService.addPropertyService(
    addressBody,
    propertyBody
  );

  return res.status(201).json({
    status: 201,
    message: 'Property added successfully',
    data: [property],
  });
}

async function listProperty(req, res) {
  const query = { ...req.query };
  const properties = await propertyService.listPropertyService(query);
  return res.status(200).json({ status: 200, data: properties });
}

async function listPropertyById(req, res) {
  const { id } = req.params;

  const property = await propertyService.listPropertyByIdService(id);
  return res.status(200).json({ status: 200, data: [property] });
}

async function updatePropertyById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const property = await propertyService.updatePropertyById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Property',
    data: [property],
  });
}

async function deletePropertyById(req, res) {
  const { id } = req.params;
  await propertyService.deletePropertyById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Property',
  });
}

//agent property

async function listPropertyByAgent(req, res) {
  const query = { ...req.query };
  const agentId = req.user._id;
  const properties = await propertyService.listPropertyServiceByAgent(
    agentId,
    query
  );
  return res.status(200).json({ status: 200, data: properties });
}

async function listPropertyByIdByAgent(req, res) {
  const { id } = req.params;
  const agentId = req.user._id;

  const property = await propertyService.listPropertyByIdByAgentService(
    agentId,
    id
  );
  return res.status(200).json({ status: 200, data: [property] });
}

async function updatePropertyByAgent(req, res) {
  const { id } = req.params;
  const agentId = req.user._id;
  const body = { ...req.body };
  const property = await propertyService.updatePropertyByAgent(
    agentId,
    id,
    body
  );
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Property',
    data: [property],
  });
}

async function deletePropertyByAgent(req, res) {
  const { id } = req.params;
  const agentId = req.user._id;

  await propertyService.deletePropertyByAgent(agentId, id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Property',
  });
}

module.exports = {
  addProperty: [verify, authRole(['ADMIN', 'AGENT']), addProperty],
  listProperty: [verify, authRole(['ADMIN']), listProperty],
  listPropertyById: [verify, authRole(['ADMIN']), listPropertyById],
  updatePropertyById: [verify, authRole(['ADMIN']), updatePropertyById],
  deletePropertyById: [verify, authRole(['ADMIN']), deletePropertyById],
  listPropertyByAgent: [verify, authRole(['AGENT']), listPropertyByAgent],
  listPropertyByIdByAgent: [
    verify,
    authRole(['AGENT']),
    listPropertyByIdByAgent,
  ],
  updatePropertyByAgent: [verify, authRole(['AGENT']), updatePropertyByAgent],
  deletePropertyByAgent: [verify, authRole(['AGENT']), deletePropertyByAgent],
};