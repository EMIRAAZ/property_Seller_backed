const News = require('../../models/News');
const { Op } = require('sequelize');

async function addnewsService(newsBody) {
  const news = await News.create(newsBody);

  return news;
}

async function listnewsService(query) {
  const news = await News.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
    where: {
      ...(query.topic ? { topics: { [Op.contains]: [query.topic] } } : {}),
    },
  });

  return news;
}

async function listnewsByIdService(id) {
  const news = await News.findAll({
    where: { id: id },
  });
  return news;
}

async function updatenewsById(id, body) {
  const news = await News.update({ ...body }, { where: { id: id } });
  return news;
}

async function deletenewsById(id) {
  const news = await News.destroy({ where: { id: id } });
  return news;
}

module.exports = {
  addnewsService,
  listnewsService,
  listnewsByIdService,
  updatenewsById,
  deletenewsById,
};
