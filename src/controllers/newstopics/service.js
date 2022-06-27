const NewsTopics = require('../../models/NewsTopics');

async function addnewstopicsService(newstopicsBody) {
  const newstopics = await NewsTopics.create(newstopicsBody);

  return newstopics;
}

async function listnewstopicsService(query) {
  const newstopics = await NewsTopics.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
  });

  return newstopics;
}

async function listnewstopicsByIdService(id) {
  const newstopics = await NewsTopics.findAll({
    where: { id: id },
  });
  return newstopics;
}

async function updatenewstopicsById(id, body) {
  const newstopics = await NewsTopics.update(
    { ...body },
    { where: { id: id } }
  );
  return newstopics;
}

async function deletenewstopicsById(id) {
  const newstopics = await NewsTopics.destroy({ where: { id: id } });
  return newstopics;
}

module.exports = {
  addnewstopicsService,
  listnewstopicsService,
  listnewstopicsByIdService,
  updatenewstopicsById,
  deletenewstopicsById,
};
