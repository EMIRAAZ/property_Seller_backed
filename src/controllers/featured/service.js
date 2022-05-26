const { Op } = require('sequelize');
const Property = require('../../models/Property');
const Address = require('../../models/Address');

async function listFeaturedPropertyService(query) {
  const { sortOrder, offset, sortBy, limit } = query;

  const properties = await Property.findAll({
    include: [{ model: Address, as: 'address', required: true }],
    limit: limit || 10,
    offset: offset || 0,
    order: [[sortBy || 'updatedAt', sortOrder || 'DESC']],
    where: { featured: true },
  });
  return properties;
}

module.exports = {
  listFeaturedPropertyService,
};
