const TagLine = require('../../models/TagLine');

async function addtaglineService(taglineBody) {
  const tagline = await TagLine.create(taglineBody);

  return tagline;
}

async function listtaglineService(query) {
  const tagline = await TagLine.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
  });

  return tagline;
}

async function listtaglineByIdService(id) {
  const tagline = await TagLine.findAll({
    where: { id: id },
  });
  return tagline;
}
async function listtaglineByTagHeadIdService(id) {
  const tagline = await TagLine.findAll({
    where: { tagheadId: id },
  });
  return tagline;
}

async function updatetaglineById(id, body) {
  const tagline = await TagLine.update({ ...body }, { where: { id: id } });
  return tagline;
}

async function deletetaglineById(id) {
  const tagline = await TagLine.destroy({ where: { id: id } });
  return tagline;
}

module.exports = {
  addtaglineService,
  listtaglineService,
  listtaglineByIdService,
  listtaglineByTagHeadIdService,
  updatetaglineById,
  deletetaglineById,
};
