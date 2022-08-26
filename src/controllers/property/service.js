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
  let {
    propertyType,
    sale,
    priceFrom,
    priceTo,
    city,
    placeAddress,
    building,
    readyToMove,
    neighborhood,
    noOfBed,
    noOfBath,
  } = query;

  const dPriceTo = priceTo ? parseFloat(priceTo).toFixed(2) : null;
  const dPriceFrom = priceFrom ? parseFloat(priceFrom).toFixed(2) : null;
  const iNoOfBed = noOfBed ? parseInt(noOfBed) : null;
  const iNoOfBath = noOfBath ? parseInt(noOfBath) : null;

  placeAddress =
    Array.isArray(placeAddress) && placeAddress.length
      ? placeAddress
      : placeAddress
      ? [placeAddress]
      : null;

  city = Array.isArray(city) && city.length ? city : city ? [city] : null;
  building =
    Array.isArray(building) && building.length
      ? building
      : building
      ? [building]
      : null;

  console.log(city);

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
        (city || placeAddress || building) && {
          [Op.or]: [
            placeAddress &&
              placeAddress.length && {
                placeAddress: {
                  [Op.or]: renderOptions(placeAddress, 'placeAddress'),
                },
              },
            city &&
              city.length && {
                city: {
                  [Op.or]: renderOptions(city, 'city'),
                },
              },
            building &&
              building.length && {
                building: {
                  [Op.or]: renderOptions(building, 'building'),
                },
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
        iNoOfBath && {
          [Op.or]: [
            {
              noOfBathroom: iNoOfBath,
            },
          ],
        },
        iNoOfBed && {
          [Op.or]: [
            {
              noOfBedroom: iNoOfBed,
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
        neighborhood && {
          neighborhood: {
            [Op.contains]: [neighborhood],
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

const renderOptions = (array = [], key = '') => {
  return array.map(item => {
    return sequelize.where(
      sequelize.fn('LOWER', sequelize.col(key)),
      'LIKE',
      `%${item.toLowerCase()}%`
    );
  });
};

async function listPropertyByIdService(id) {
  const property = await Property.findAll({
    include: [
      { model: Address, as: 'address', required: true },
      { model: Agent, as: 'agent', required: false },
      { model: Agency, as: 'agency', required: false },
    ],

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
    verified,
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
        verified && {
          [Op.or]: [
            {
              verified: verified,
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
