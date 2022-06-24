const { generateUniqueID } = require('../../utils');
const tagheadsService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addtagheads(req, res) {
  const body = { ...req.body };

  const tagheadsBody = {
    id: generateUniqueID(),
    title: body.title,
  };

  const tagheads = await tagheadsService.addtagheadsService(tagheadsBody);

  return res.status(201).json({
    status: 201,
    message: 'Tag Head added successfully',
    data: [tagheads],
  });
}

async function listtagheads(req, res) {
  const query = { ...req.query };
  const tagheads = await tagheadsService.listtagheadsService(query);
  return res.status(200).json({ status: 200, data: tagheads });
}

async function listtagheadsById(req, res) {
  const { id } = req.params;

  const tagheads = await tagheadsService.listtagheadsByIdService(id);
  return res.status(200).json({ status: 200, data: tagheads });
}

async function updatetagheadsById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const tagheads = await tagheadsService.updatetagheadsById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Tag Head',
    data: [tagheads],
  });
}

async function deletetagheadsById(req, res) {
  const { id } = req.params;
  await tagheadsService.deletetagheadsById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Tag Head',
  });
}

module.exports = {
  addtagheads: [verify, authRole(['ADMIN', 'AGENT']), addtagheads],
  listtagheads: [listtagheads],
  listtagheadsById: [listtagheadsById],
  updatetagheadsById: [verify, authRole(['ADMIN']), updatetagheadsById],
  deletetagheadsById: [verify, authRole(['ADMIN']), deletetagheadsById],
};
