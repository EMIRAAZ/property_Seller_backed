const featuredService = require('./service');

async function listFeaturedProperty(req, res) {
  const query = { ...req.query };
  const properties = await featuredService.listFeaturedPropertyService(query);
  return res.status(200).json({ status: 200, data: properties });
}

module.exports = {
  listFeaturedProperty: [listFeaturedProperty],
};
