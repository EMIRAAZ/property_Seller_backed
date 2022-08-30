const Agency = require('../../models/Agency');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../../utils');

async function addAgencyService(agencyBody) {
  const isExistingAgency = await Agency.findOne({
    where: {
      username: agencyBody.username,
    },
  });
  if (isExistingAgency)
    throw new Error(createError(409, 'Agency already exists', { status: 409 }));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(agencyBody.password, salt);
  agencyBody.password = hashedPassword;

  const agency = await Agency.create({ ...agencyBody });
  agency.password = 'encrypted!';
  return agency;
}

async function loginAgencyService(body) {
  const credentials = { ...body };

  const agency = await Agency.findOne({
    where: { username: credentials.username },
  });
  if (!agency) throw new Error('username or password is wrong');

  const checkIfPasswordValid = await bcrypt.compare(
    credentials.password,
    agency.password
  );
  if (!checkIfPasswordValid)
    throw new Error(
      `Invalid password ${(agency.password, credentials.password)}`
    );

  const user = {
    _id: agency.id,
    role: 'AGENCY',
  };

  const token = generateAccessToken(user);
  return token;
}

async function listAgencyService() {
  const agencys = await Agency.findAndCountAll();
  return agencys;
}

async function listAgencyByIdService(id) {
  const agency = await Agency.findByPk(id);
  return agency;
}

async function updateAgencyById(id, body) {
  const agency = await Agency.update({ ...body }, { where: { id: id } });
  return agency;
}

async function deleteAgencyById(id) {
  const agency = await Agency.destroy({ where: { id: id } });
  return agency;
}

module.exports = {
  addAgencyService,
  listAgencyService,
  listAgencyByIdService,
  updateAgencyById,
  deleteAgencyById,
  loginAgencyService,
};
