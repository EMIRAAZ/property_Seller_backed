const { generateUniqueID } = require('../../utils');
const advertiseClientService = require('./service');

async function addadvertiseClient(req, res) {
  const body = { ...req.body };

  const advertiseClientBody = {
    id: generateUniqueID(),
    ...body,
  };

  const advertiseClient =
    await advertiseClientService.addadvertiseClientService(advertiseClientBody);

  return res.status(201).json({
    status: 201,
    message: 'advertiseClient  added successfully',
    data: [advertiseClient],
  });
}

async function listadvertiseClient(req, res) {
  const query = { ...req.query };
  const advertiseClient =
    await advertiseClientService.listadvertiseClientService(query);
  return res.status(200).json({ status: 200, data: advertiseClient });
}

module.exports = {
  addadvertiseClient: [addadvertiseClient],
  listadvertiseClient: [listadvertiseClient],
};
