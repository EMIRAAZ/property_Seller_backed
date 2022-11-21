const City = require('../../models/City');
const { Op } = require('sequelize');

async function addCityService(cityBody) {
  const city = await City.create(cityBody);
  return city;
}

async function listCityService() {
  const citys = await City.findAndCountAll();
  return citys;
}

async function listCityByIdService(id) {
  const city = await City.findByPk(id);
  return city;
}
async function listCityByEmirate(emirate) {
  const city = await City.findOne({
    where: {
      emirate: {
        [Op.like]: '%' + emirate + '%',
      },
    },
  });
  return city;
}

async function updateCityById(id, body) {
  const city = await City.update({ ...body }, { where: { id: id } });
  return city;
}

async function deleteCityById(id) {
  const city = await City.destroy({ where: { id: id } });
  return city;
}

module.exports = {
  addCityService,
  listCityService,
  listCityByIdService,
  updateCityById,
  deleteCityById,
  listCityByEmirate,
};
