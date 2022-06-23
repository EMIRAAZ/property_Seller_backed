const { Op } = require('sequelize');
const sequelize = require('../../database/dbConnection');
const OffPlan = require('../../models/OffPlan');
const Address = require('../../models/Address');

async function addOffplanService(addressBody, offplanBody) {
  await Address.create(addressBody);
  const offplanBodyWithAddressId = {
    ...offplanBody,
    addressId: addressBody.id,
  };
  const offplan = await OffPlan.create(offplanBodyWithAddressId);

  return offplan;
}

async function listOffplanService(query) {
  const { city, placeAddress, building } = query;

  const properties = await OffPlan.findAndCountAll({
    include: [{ model: Address, as: 'address', required: true }],
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
    where: {
      [Op.and]: [
        location && {
          [Op.or]: [
            {
              placeAddress: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('placeAddress')),
                'LIKE',
                `%${location.toLowerCase()}%`
              ),
            },
            {
              building: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('building')),
                'LIKE',
                `%${location.toLowerCase()}%`
              ),
            },
            {
              city: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('city')),
                'LIKE',
                `%${location.toLowerCase()}%`
              ),
            },
          ],
        },
        city && {
          [Op.or]: [
            placeAddress && {
              placeAddress: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('placeAddress')),
                'LIKE',
                `%${placeAddress.toLowerCase()}%`
              ),
            },
            {
              city: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('city')),
                'LIKE',
                `%${city.toLowerCase()}%`
              ),
            },
            building && {
              building: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('building')),
                'LIKE',
                `%${building.toLowerCase()}%`
              ),
            },
          ],
        },
      ],
    },
  });

  return properties;
}

async function listOffplanByIdService(id) {
  const offplan = await OffPlan.findAll({
    include: [{ model: Address, as: 'address', required: true }],
    where: { id: id },
  });
  return offplan;
}

async function updateOffplanById(id, body) {
  const offplan = await OffPlan.update({ ...body }, { where: { id: id } });
  return offplan;
}

async function deleteOffplanById(id) {
  const offplan = await OffPlan.destroy({ where: { id: id } });
  return offplan;
}

module.exports = {
  addOffplanService,
  listOffplanService,
  listOffplanByIdService,
  updateOffplanById,
  deleteOffplanById,
};
