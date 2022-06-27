const { generateUniqueID } = require('../../utils');
const newstopicsService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addnewstopics(req, res) {
  const body = { ...req.body };

  const newstopicsBody = {
    id: generateUniqueID(),
    name: body.name,
  };

  const newstopics = await newstopicsService.addnewstopicsService(
    newstopicsBody
  );

  return res.status(201).json({
    status: 201,
    message: 'News Topic added successfully',
    data: [newstopics],
  });
}

async function listnewstopics(req, res) {
  const query = { ...req.query };
  const newstopics = await newstopicsService.listnewstopicsService(query);
  return res.status(200).json({ status: 200, data: newstopics });
}

async function listnewstopicsById(req, res) {
  const { id } = req.params;

  const newstopics = await newstopicsService.listnewstopicsByIdService(id);
  return res.status(200).json({ status: 200, data: newstopics });
}

async function updatenewstopicsById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const newstopics = await newstopicsService.updatenewstopicsById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated News Topic',
    data: [newstopics],
  });
}

async function deletenewstopicsById(req, res) {
  const { id } = req.params;
  await newstopicsService.deletenewstopicsById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted News Topic',
  });
}

module.exports = {
  addnewstopics: [verify, authRole(['ADMIN', 'AGENT']), addnewstopics],
  listnewstopics: [listnewstopics],
  listnewstopicsById: [listnewstopicsById],
  updatenewstopicsById: [verify, authRole(['ADMIN']), updatenewstopicsById],
  deletenewstopicsById: [verify, authRole(['ADMIN']), deletenewstopicsById],
};
