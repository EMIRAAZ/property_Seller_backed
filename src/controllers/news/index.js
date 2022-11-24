const { generateUniqueID } = require('../../utils');
const newsService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addnews(req, res) {
  const body = { ...req.body };

  const newsBody = {
    id: generateUniqueID(),
    title: body.title,
    description: body.description,
    image: body.image,
  };

  const news = await newsService.addnewsService(newsBody);

  return res.status(201).json({
    status: 201,
    message: 'News  added successfully',
    data: [news],
  });
}

async function listnews(req, res) {
  const query = { ...req.query };
  const news = await newsService.listnewsService(query);
  return res.status(200).json({ status: 200, data: news });
}

async function listnewsById(req, res) {
  const { id } = req.params;

  const news = await newsService.listnewsByIdService(id);
  return res.status(200).json({ status: 200, data: news });
}

async function updatenewsById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const news = await newsService.updatenewsById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated News ',
    data: [news],
  });
}

async function deletenewsById(req, res) {
  const { id } = req.params;
  await newsService.deletenewsById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted News ',
  });
}

module.exports = {
  addnews: [verify, authRole(['ADMIN', 'AGENT']), addnews],
  listnews: [listnews],
  listnewsById: [listnewsById],
  updatenewsById: [verify, authRole(['ADMIN']), updatenewsById],
  deletenewsById: [verify, authRole(['ADMIN']), deletenewsById],
};
