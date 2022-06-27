const Blog = require('../../models/Blog');

async function addblogService(blogBody) {
  const blog = await Blog.create(blogBody);

  return blog;
}

async function listblogService(query) {
  const blog = await Blog.findAndCountAll({
    limit: query.limit || 10,
    offset: query.offset || 0,
    order: [[query.sortBy || 'updatedAt', query.sortOrder || 'DESC']],
  });

  return blog;
}

async function listblogByIdService(id) {
  const blog = await Blog.findAll({
    where: { id: id },
  });
  return blog;
}

async function updateblogById(id, body) {
  const blog = await Blog.update({ ...body }, { where: { id: id } });
  return blog;
}

async function deleteblogById(id) {
  const blog = await Blog.destroy({ where: { id: id } });
  return blog;
}

module.exports = {
  addblogService,
  listblogService,
  listblogByIdService,
  updateblogById,
  deleteblogById,
};
