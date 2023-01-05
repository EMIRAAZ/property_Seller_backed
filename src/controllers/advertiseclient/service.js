const AdvertiseClient = require('../../models/AdvertiseClient');

async function addadvertiseClientService(advertiseClientBody) {
  const advertiseClient = await AdvertiseClient.create(advertiseClientBody);

  return advertiseClient;
}

async function listadvertiseClientService(query) {
  const advertiseClient = await AdvertiseClient.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
  });

  return advertiseClient;
}

module.exports = {
  addadvertiseClientService,
  listadvertiseClientService,
};
