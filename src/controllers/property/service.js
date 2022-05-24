const { Op } = require('sequelize');
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
  const { location, propertyType, sale, priceFrom, priceTo } = query;

  const properties = await Property.findAndCountAll({
    include: [{ model: Address, as: 'address', required: true }],
    ...(location && {
      where: {
        placeAddress: { [Op.like]: '%' + searchQuery + '%' },
      },
    }),
  });

  return properties;
}

async function listPropertyByIdService(id) {
  const property = await Property.findByPk(id);
  return property;
}

async function updatePropertyById(id, body) {
  const property = await Property.update({ ...body }, { where: { id: id } });
  return property;
}

async function deletePropertyById(id) {
  const property = await Property.destroy({ where: { id: id } });
  return property;
}

module.exports = {
  addPropertyService,
  listPropertyService,
  listPropertyByIdService,
};
