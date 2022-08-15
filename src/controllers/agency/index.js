const { generateUniqueID } = require('../../utils');
const agencyService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function listAgency(req, res) {
  const agencys = await agencyService.listAgencyService();
  return res.status(200).json({ status: 200, data: agencys });
}

async function addAgency(req, res) {
  const body = { ...req.body };

  const agencyBody = {
    id: generateUniqueID(),
    agencyName: body.agencyName,
    ...(body.agencyLogo ? { agencyLogo: body.agencyLogo } : {}),
    ...(body.tradeLicenseNo ? { tradeLicenseNo: body.tradeLicenseNo } : {}),
    ...(body.brn ? { brn: body.brn } : {}),
    ...(body.website ? { website: body.website } : {}),
    ...(body.email ? { email: body.email } : {}),
    ...(body.phoneNumber ? { phoneNumber: body.phoneNumber } : {}),
    ...(body.whatsAppNumber ? { whatsAppNumber: body.whatsAppNumber } : {}),
    ...(body.officeAddress ? { officeAddress: body.officeAddress } : {}),
    ...(body.ownerName ? { ownerName: body.ownerName } : {}),
  };

  const agency = await agencyService.addAgencyService(agencyBody);

  return res.status(201).json({
    status: 201,
    message: 'Agency added successfully',
    data: [agency],
  });
}

async function loginAgency(req, res) {
  const body = { ...req.body };
  const token = await agencyService.loginAgencyService(body);

  return res
    .header('auth-token', token)
    .header('role', 'ADMIN')
    .status(200)
    .json({ status: 200, message: 'You are logged in' });
}

async function listAgencyById(req, res) {
  const { id } = req.params;

  const agency = await agencyService.listAgencyByIdService(id);
  return res.status(200).json({ status: 200, data: [agency] });
}

async function updateAgencyById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const agency = await agencyService.updateAgencyById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Agency',
    data: [agency],
  });
}

async function deleteAgencyById(req, res) {
  const { id } = req.params;
  await agencyService.deleteAgencyById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Agency',
  });
}

module.exports = {
  listAgency: [verify, authRole(['ADMIN']), listAgency],
  addAgency: [verify, authRole(['ADMIN']), addAgency],
  loginAgency: [verify, loginAgency],
  listAgencyById: [verify, authRole(['ADMIN']), listAgencyById],
  updateAgencyById: [verify, authRole(['ADMIN']), updateAgencyById],
  deleteAgencyById: [verify, authRole(['ADMIN']), deleteAgencyById],
};
