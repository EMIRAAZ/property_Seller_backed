const FamousNeighborhood = require('../../models/FamousNeighborhood');

async function addFamousNeighborhoodService(offplanBody) {
  const offplan = await FamousNeighborhood.create(offplanBody);

  return offplan;
}

async function listFamousNeighborhoodService(query) {
  const neighborhood = await FamousNeighborhood.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
  });

  return neighborhood;
}

async function listFamousNeighborhoodByIdService(id) {
  const offplan = await FamousNeighborhood.findAll({
    where: { id: id },
  });
  return offplan;
}

async function updateFamousNeighborhoodById(id, body) {
  const offplan = await FamousNeighborhood.update(
    { ...body },
    { where: { id: id } }
  );
  return offplan;
}

async function deleteFamousNeighborhoodById(id) {
  const offplan = await FamousNeighborhood.destroy({ where: { id: id } });
  return offplan;
}

module.exports = {
  addFamousNeighborhoodService,
  listFamousNeighborhoodService,
  listFamousNeighborhoodByIdService,
  updateFamousNeighborhoodById,
  deleteFamousNeighborhoodById,
};
