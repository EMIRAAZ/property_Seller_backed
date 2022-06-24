const { generateUniqueID } = require('../../utils');
const taglineService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addtagline(req, res) {
  const body = { ...req.body };

  const taglineBody = {
    id: generateUniqueID(),
    title: body.title,
  };

  const tagline = await taglineService.addtaglineService(taglineBody);

  return res.status(201).json({
    status: 201,
    message: 'Tag Line added successfully',
    data: [tagline],
  });
}

async function listtagline(req, res) {
  const query = { ...req.query };
  const tagline = await taglineService.listtaglineService(query);
  return res.status(200).json({ status: 200, data: tagline });
}

async function listtaglineById(req, res) {
  const { id } = req.params;

  const tagline = await taglineService.listtaglineByIdService(id);
  return res.status(200).json({ status: 200, data: tagline });
}

async function listtaglineByTagHeadId(req, res) {
  const { id } = req.params;

  const tagline = await taglineService.listtaglineByTagHeadIdService(id);
  return res.status(200).json({ status: 200, data: tagline });
}

async function updatetaglineById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const tagline = await taglineService.updatetaglineById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Tag Line',
    data: [tagline],
  });
}

async function deletetaglineById(req, res) {
  const { id } = req.params;
  await taglineService.deletetaglineById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Tag Line',
  });
}

module.exports = {
  addtagline: [verify, authRole(['ADMIN', 'AGENT']), addtagline],
  listtagline: [listtagline],
  listtaglineById: [listtaglineById],
  listtaglineByTagHeadId: [listtaglineByTagHeadId],
  updatetaglineById: [verify, authRole(['ADMIN']), updatetaglineById],
  deletetaglineById: [verify, authRole(['ADMIN']), deletetaglineById],
};
