const { generateUniqueID } = require('../../utils');
const blogService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function addblog(req, res) {
  const body = { ...req.body };

  const blogBody = {
    id: generateUniqueID(),
    title: body.title,
    description: body.description,
    image: body.image,
  };

  const blog = await blogService.addblogService(blogBody);

  return res.status(201).json({
    status: 201,
    message: 'Blog  added successfully',
    data: [blog],
  });
}

async function listblog(req, res) {
  const query = { ...req.query };
  const blog = await blogService.listblogService(query);
  return res.status(200).json({ status: 200, data: blog });
}

async function listblogById(req, res) {
  const { id } = req.params;

  const blog = await blogService.listblogByIdService(id);
  return res.status(200).json({ status: 200, data: blog });
}

async function updateblogById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const blog = await blogService.updateblogById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Blog ',
    data: [blog],
  });
}

async function deleteblogById(req, res) {
  const { id } = req.params;
  await blogService.deleteblogById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Blog ',
  });
}

module.exports = {
  addblog: [verify, authRole(['ADMIN', 'AGENT']), addblog],
  listblog: [listblog],
  listblogById: [listblogById],
  updateblogById: [verify, authRole(['ADMIN']), updateblogById],
  deleteblogById: [verify, authRole(['ADMIN']), deleteblogById],
};
