const { generateUniqueID } = require('../../utils');
const adminService = require('./service');

async function registerAdmin(req, res) {
  const body = { ...req.body };

  const adminBody = {
    id: generateUniqueID(),
    username: body.username,
    password: body.password,
    role: 'ADMIN',
    ...(body.adminName ? { adminName: body.adminName } : {}),
    ...(body.adminImage ? { adminImage: body.adminImage } : {}),
  };

  const admin = await adminService.registerAdminService(adminBody);
  return res.status(201).json({
    status: 201,
    message: 'Successfully registered admin',
    data: [admin],
  });
}

async function loginAdmin(req, res) {
  const body = { ...req.body };
  const token = await adminService.loginAdminService(body);

  return res
    .header('auth-token', token)
    .header('role', 'ADMIN')
    .status(200)
    .json({ status: 200, message: 'You are logged in' });
}

async function listAdmin(req, res) {
  const admins = await adminService.listAdminService();
  return res.status(200).json({ status: 200, data: admins });
}

async function listAdminById(req, res) {
  const { id } = req.params;

  const admin = await adminService.listAdminByIdService(id);
  return res.status(200).json({ status: 200, data: [admin] });
}

async function updateAdminById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const admin = await adminService.updateAdminById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Admin',
    data: [admin],
  });
}

async function deleteAdminById(req, res) {
  const { id } = req.params;
  await adminService.deleteAdminById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Admin',
  });
}

module.exports = {
  registerAdmin: [registerAdmin],
  loginAdmin: [loginAdmin],
  //   listAdmin: [listAdmin],
  //   listAdminById: [listAdminById],
  //   updateAdminById: [updateAdminById],
  //   deleteAdminById: [deleteAdminById],
};
