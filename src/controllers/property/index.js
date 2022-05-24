const { generateUniqueID } = require('../../utils');
const propertyService = require('./service');

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

module.exports = {
  addProperty: [addProperty],
  listProperty: [listProperty],
  listPropertyById: [listPropertyById],
  updatePropertyById: [updatePropertyById],
  deletePropertyById: [deletePropertyById],
};
