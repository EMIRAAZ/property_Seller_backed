const Property = require('../../models/Property');
const Address = require('../../models/Address');

async function addPropertyService(addressBody, propertyBody) {
  const address = await Address.create(addressBody);
  const propertyBodyWithAddressId = {
    ...propertyBody,
    addressId: addressBody.id,
  };
  const property = await Property.create(propertyBodyWithAddressId);

  return property;
}

async function listPropertyService(query) {
  const {} = query;

  const properties = await Property.findAll({});

  return properties;
}

module.exports = {
  addPropertyService,
  listPropertyService,
};
