const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { generateAccessToken } = require('../../utils');

const Admin = require('../../models/Admin');

async function registerAdminService(body) {
  const adminBody = { ...body };

  const isExistingAdmin = await Admin.findOne({
    where: {
      username: adminBody.username,
    },
  });
  if (isExistingAdmin)
    throw new Error(createError(409, 'Admin already exists', { status: 409 }));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(adminBody.password, salt);
  adminBody.password = hashedPassword;

  const admin = await Admin.create({ ...adminBody });
  admin.password = 'encrypted!';
  return admin;
}

async function loginAdminService(body) {
  const credentials = { ...body };

  const admin = await Admin.findOne({
    where: { username: credentials.username },
  });
  if (!admin) throw new Error('username or password is wrong');

  const checkIfPasswordValid = await bcrypt.compare(
    credentials.password,
    admin.password
  );
  if (!checkIfPasswordValid) throw new Error('Invalid password');

  const user = {
    _id: admin.id,
    role: admin.role,
  };

  const token = generateAccessToken(user);
  return token;
}

async function listAdminService() {
  const admins = await Admin.findAll();
  return admins;
}

async function listAdminByIdService(id) {
  const admin = await Admin.findByPk(id);
  return admin;
}

async function updateAdminById(id, body) {
  const admin = await Admin.update({ ...body }, { where: { id: id } });
  return admin;
}

async function deleteAdminById(id) {
  const admin = await Admin.destroy({ where: { id: id } });
  return admin;
}

module.exports = {
  registerAdminService,
  loginAdminService,
  listAdminService,
  listAdminByIdService,
  updateAdminById,
  deleteAdminById,
};
