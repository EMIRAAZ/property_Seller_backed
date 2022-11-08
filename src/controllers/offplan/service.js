const { Op } = require('sequelize');
const sequelize = require('../../database/dbConnection');
const OffPlan = require('../../models/OffPlan');
const Address = require('../../models/Address');
const Agent = require('../../models/Agent');

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
  const { emirate, propertyType } = query;

  const properties = await OffPlan.findAndCountAll({
    include: [
      { model: Address, as: 'address', required: true },
      { model: Agent, as: 'agent', required: false },
    ],
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
    where: {
      [Op.and]: [
        emirate && {
          [Op.or]: [
            {
              emirate: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('emirate')),
                'LIKE',
                `%${emirate.toLowerCase()}%`
              ),
            },
          ],
        },
        propertyType && {
          [Op.or]: [
            {
              propertyType: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('propertyType')),
                'LIKE',
                `%${propertyType.toLowerCase()}%`
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
    include: [
      { model: Address, as: 'address', required: true },
      { model: Agent, as: 'agent', required: false },
    ],
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
