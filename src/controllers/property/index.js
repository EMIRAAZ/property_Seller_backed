const { generateUniqueID } = require('../../utils');
const propertyService = require('./service');

async function addProperty(req, res) {
  const body = { ...req.body };

  const addressBody = {
    id: generateUniqueID(),
    placeAddress: body.placeAddress,
    building: body.building,
    city: body.city,
    latitude: body.latitude,
    longitude: body.longitude,
  };

  const propertyBody = {
    id: generateUniqueID(),
    title: body.title,
    description: body.description,
    images: body.images,
    price: body.price,
    videoView: body.videoView,
    propertyType: body.propertyType,
    propertySize: body.propertySize,
    propertySizeUnit: body.propertySizeUnit,
    propertyAge: body.propertyAge,
    noOfBedroom: body.noOfBedroom,
    noOfBathroom: body.noOfBathroom,
    amenities: body.amenities,
    referenceNo: body.referenceNo,
    trakheesiPermit: body.trakheesiPermit,
    ownership: body.ownership,
    brokerORN: body.brokerORN,
    agentORN: body.agentORN,
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

module.exports = {
  addProperty,
  listProperty,
};
