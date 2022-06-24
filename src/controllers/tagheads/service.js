const TagHeads = require('../../models/TagHeads');

async function addtagheadsService(tagheadsBody) {
  const tagheads = await TagHeads.create(tagheadsBody);

  return tagheads;
}

async function listtagheadsService(query) {
  const tagheads = await TagHeads.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
  });

  return tagheads;
}

async function listtagheadsByIdService(id) {
  const tagheads = await TagHeads.findAll({
    where: { id: id },
  });
  return tagheads;
}

async function updatetagheadsById(id, body) {
  const tagheads = await TagHeads.update({ ...body }, { where: { id: id } });
  return tagheads;
}

async function deletetagheadsById(id) {
  const tagheads = await TagHeads.destroy({ where: { id: id } });
  return tagheads;
}

module.exports = {
  addtagheadsService,
  listtagheadsService,
  listtagheadsByIdService,
  updatetagheadsById,
  deletetagheadsById,
};
