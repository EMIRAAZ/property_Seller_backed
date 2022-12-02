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
    priceFrom,
    priceTo,
    readyToMove,
    neighborhood,
    amenities,
    noOfBed,
    noOfBath,
    verified,
    offplan,
    tagline,
    emirate,
    location,
  } = query;

  const iPriceTo = priceTo ? parseInt(priceTo) : null;
  const iPriceFrom = priceFrom ? parseInt(priceFrom) : null;
  const iNoOfBed = noOfBed ? parseInt(noOfBed) : null;
  const iNoOfBath = noOfBath ? parseInt(noOfBath) : null;

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
            location &&
              location.length && {
                placeAddress: {
                  [Op.or]: renderOptions(location, 'placeAddress'),
                },
              },
            location &&
              location.length && {
                city: {
                  [Op.or]: renderOptions(location, 'city'),
                },
              },
            location &&
              location.length && {
                building: {
                  [Op.or]: renderOptions(location, 'building'),
                },
              },
            location &&
              location.length && {
                building: {
                  [Op.or]: renderOptions(location, 'emirate'),
                },
              },
          ],
        },
        verified && {
          verified: verified,
        },
        offplan && {
          offplan: offplan,
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
        iPriceFrom && {
          price: {
            [Op.gte]: iPriceFrom,
          },
        },
        iPriceTo && {
          price: {
            [Op.lte]: iPriceTo,
          },
        },
        neighborhood && {
          neighborhood: {
            [Op.contains]: [neighborhood],
          },
        },
        amenities && {
          amenities: {
            [Op.contains]: [amenities],
          },
        },
        readyToMove && {
          readyToMove: readyToMove,
        },
        tagline && {
          tagline: {
            [Op.contains]: [tagline],
          },
        },
      ],
    },
  });

  return properties;
}

const renderOptions = (array = [], key = '') => {
  if (Array.isArray(array)) {
    return array.map(item => {
      return sequelize.where(
        sequelize.fn('LOWER', sequelize.col(key)),
        'LIKE',
        `%${item.toLowerCase()}%`
      );
    });
  } else {
    return [array].map(item => {
      return sequelize.where(
        sequelize.fn('LOWER', sequelize.col(key)),
        'LIKE',
        `%${item.toLowerCase()}%`
      );
    });
  }
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
    priceFrom,
    priceTo,
    city,
    placeAddress,
    building,
  } = query;

  const iPriceTo = priceTo ? parseFloat(priceTo).toFixed(2) : null;
  const iPriceFrom = priceFrom ? parseFloat(priceFrom).toFixed(2) : null;

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
        iPriceFrom && {
          price: {
            [Op.gte]: iPriceFrom,
          },
        },
        iPriceTo && {
          price: {
            [Op.lte]: iPriceTo,
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

// list property by agency

async function listPropertyServiceByAgency(agencyId, query) {
  const {
    location,
    propertyType,
    priceFrom,
    priceTo,
    city,
    placeAddress,
    building,
  } = query;

  const iPriceTo = priceTo ? parseFloat(priceTo).toFixed(2) : null;
  const iPriceFrom = priceFrom ? parseFloat(priceFrom).toFixed(2) : null;

  const properties = await Property.findAndCountAll({
    include: [{ model: Address, as: 'address', required: true }],
    where: {
      [Op.and]: [
        {
          agencyId: agencyId,
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
        iPriceFrom && {
          price: {
            [Op.gte]: iPriceFrom,
          },
        },
        iPriceTo && {
          price: {
            [Op.lte]: iPriceTo,
          },
        },
      ],
    },
  });

  return properties;
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
  listPropertyServiceByAgency,
};
