const Agency = require('../../models/Agency');

async function addAgencyService(agencyBody) {
  const agency = await Agency.create(agencyBody);
  return agency;
}

async function listAgencyService() {
  const agencys = await Agency.findAll();
  return agencys;
}

async function listAgencyByIdService(id) {
  const agency = await Agency.findByPk(id);
  return agency;
}

async function updateAgencyById(id, body) {
  const agency = await Agency.update({ ...body }, { where: { id: id } });
  return agency;
}

async function deleteAgencyById(id) {
  const agency = await Agency.destroy({ where: { id: id } });
  return agency;
}

module.exports = {
  addAgencyService,
  listAgencyService,
  listAgencyByIdService,
  updateAgencyById,
  deleteAgencyById,
};
