const { Op } = require('sequelize');
const sequelize = require('../../database/dbConnection');
const Property = require('../../models/Property');
const Address = require('../../models/Address');
const Agent = require('../../models/Agent');
const Agency = require('../../models/Agency');

async function addPropertyService(addressBody, propertyBody) {
  await Address.create(addressBody);
  const propertyBodyWithAddressId = {
    ...propertyBody,
    addressId: addressBody.id,
  };
  const property = await Property.create(propertyBodyWithAddressId);

  return property;
}

async function listPropertyService(query) {
  const {
    location,
    propertyType,
    sale,
    priceFrom,
    priceTo,
    city,
    placeAddress,
    building,
    readyToMove,
  } = query;

  const dPriceTo = priceTo ? parseFloat(priceTo).toFixed(2) : null;
  const dPriceFrom = priceFrom ? parseFloat(priceFrom).toFixed(2) : null;

  const properties = await Property.findAndCountAll({
    include: [
      { model: Address, as: 'address', required: true },
      { model: Agent, as: 'agent', required: false },
      { model: Agency, as: 'agency', required: false },
    ],
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
        sale &&
          sale === 'both' && {
            [Op.or]: [
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%rent%`
                ),
              },
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%buy%`
                ),
              },
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%both%`
                ),
              },
            ],
          },
        sale &&
          sale !== 'both' && {
            [Op.or]: [
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%${sale.toLowerCase()}%`
                ),
              },
            ],
          },
        dPriceFrom && {
          price: {
            [Op.gte]: dPriceFrom,
          },
        },
        dPriceTo && {
          price: {
            [Op.lte]: dPriceTo,
          },
        },
        readyToMove && {
          readyToMove: true,
        },
      ],
    },
  });

  return properties;
}

async function listPropertyByIdService(id) {
  const property = await Property.findAll({
    include: [{ model: Address, as: 'address', required: true }],
    where: { id: id },
  });
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

//agent

async function listPropertyServiceByAgent(agentId, query) {
  const {
    location,
    propertyType,
    sale,
    priceFrom,
    priceTo,
    city,
    placeAddress,
    building,
  } = query;

  const dPriceTo = priceTo ? parseFloat(priceTo).toFixed(2) : null;
  const dPriceFrom = priceFrom ? parseFloat(priceFrom).toFixed(2) : null;

  const properties = await Property.findAndCountAll({
    include: [{ model: Address, as: 'address', required: true }],
    where: {
      [Op.and]: [
        {
          agentId: agentId,
        },
        location && {
          [Op.or]: [
            {
              placeAddress: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('placeAddress')),
                'LIKE',
                `%${location}%`
              ),
            },
            {
              building: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('building')),
                'LIKE',
                `%${location}%`
              ),
            },
            {
              city: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('city')),
                'LIKE',
                `%${location}%`
              ),
            },
          ],
        },
        placeAddress && {
          [Op.or]: [
            {
              placeAddress: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('placeAddress')),
                'LIKE',
                `%${placeAddress}%`
              ),
            },
          ],
        },
        city && {
          [Op.or]: [
            {
              city: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('city')),
                'LIKE',
                `%${city}%`
              ),
            },
          ],
        },
        building && {
          [Op.or]: [
            {
              building: sequelize.where(
                sequelize.fn('LOWER', sequelize.col('building')),
                'LIKE',
                `%${building}%`
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
                `%${propertyType}%`
              ),
            },
          ],
        },
        sale &&
          sale === 'both' && {
            [Op.or]: [
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%rent%`
                ),
              },
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%buy%`
                ),
              },
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%both%`
                ),
              },
            ],
          },
        sale &&
          sale !== 'both' && {
            [Op.or]: [
              {
                for: sequelize.where(
                  sequelize.fn('LOWER', sequelize.col('for')),
                  'LIKE',
                  `%${sale}%`
                ),
              },
            ],
          },
        dPriceFrom && {
          price: {
            [Op.gte]: dPriceFrom,
          },
        },
        dPriceTo && {
          price: {
            [Op.lte]: dPriceTo,
          },
        },
      ],
    },
  });

  return properties;
}

async function listPropertyByIdByAgentService(agentId, id) {
  const property = await Property.findAll({
    where: { agentId: agentId, id: id },
  });
  return property;
}

async function updatePropertyByAgent(agentId, id, body) {
  const property = await Property.update(
    { ...body },
    { where: { agentId: agentId, id: id } }
  );
  return property;
}

async function deletePropertyByAgent(agentId, id) {
  const property = await Property.destroy({
    where: { agentId: agentId, id: id },
  });
  return property;
}

module.exports = {
  addPropertyService,
  listPropertyService,
  listPropertyByIdService,
  updatePropertyById,
  deletePropertyById,
  listPropertyByIdByAgentService,
  listPropertyServiceByAgent,
  updatePropertyByAgent,
  deletePropertyByAgent,
};
