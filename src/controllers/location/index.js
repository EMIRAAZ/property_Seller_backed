const locationService = require('./service');

async function searchLocation(req, res) {
  const body = { ...req.body };

  const location = await locationService.searchLocationService(body.location);

  return res.status(201).json({
    status: 201,
    data: [location],
  });
}

module.exports = {
  searchLocation: [searchLocation],
};
