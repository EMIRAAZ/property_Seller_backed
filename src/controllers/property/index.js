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
    emirate: body.emirate,
    latitude: body.coordinates.lat,
    longitude: body.coordinates.lng,
    ...(body.building ? { building: body.building } : {}),
  };

  const propertyBody = {
    id: generateUniqueID(),
    title: body.title,
    mainTitle: body.mainTitle,
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
    verified: body.verified,
    offplan: body.offplan,
    readyToMove: body.readyToMove,
    referenceNo: generateUniqueID(),
    ...(body.noOfShare ? { noOfShare: body.noOfShare } : {}),
    ...(body.noOfReport ? { noOfReport: body.noOfReport } : {}),
    agentId: body.agentId,
    agencyId: body.agencyId,
    taglineId: body.taglineId,
    ...(body.videoView ? { videoView: body.videoView } : {}),
    ...(body.amenities ? { amenities: body.amenities } : {}),
    ...(body.neighborhood ? { neighborhood: body.neighborhood } : {}),
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
  return res.status(200).json({ status: 200, data: property });
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

//agency property

async function listPropertyByAgency(req, res) {
  const query = { ...req.query };
  const agencyId = req.user._id;
  const properties = await propertyService.listPropertyServiceByAgency(
    agencyId,
    query
  );
  return res.status(200).json({ status: 200, data: properties });
}

module.exports = {
  addProperty: [verify, authRole(['ADMIN', 'AGENT', 'AGENCY']), addProperty],
  listPropertyByAgency: [
    verify,
    authRole(['ADMIN', 'AGENT', 'AGENCY']),
    listPropertyByAgency,
  ],
  listProperty: [listProperty],
  listPropertyById: [listPropertyById],
  updatePropertyById: [
    verify,
    authRole(['ADMIN', 'AGENCY']),
    updatePropertyById,
  ],
  deletePropertyById: [
    verify,
    authRole(['ADMIN', 'AGENCY']),
    deletePropertyById,
  ],
  listPropertyByAgent: [verify, authRole(['AGENT']), listPropertyByAgent],
  listPropertyByIdByAgent: [
    verify,
    authRole(['AGENT']),
    listPropertyByIdByAgent,
  ],
  updatePropertyByAgent: [verify, authRole(['AGENT']), updatePropertyByAgent],
  deletePropertyByAgent: [verify, authRole(['AGENT']), deletePropertyByAgent],
};
