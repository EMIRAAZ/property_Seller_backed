const { generateUniqueID } = require('../../utils');
const agentService = require('./service');
const authRole = require('../../middleware/role');
const verify = require('../../middleware/verify-token');

async function registerAgent(req, res) {
  const body = { ...req.body };

  const agentBody = {
    id: generateUniqueID(),
    username: body.username,
    password: body.password,
    role: 'AGENT',
    agencyId: body.agencyId,
    ...(body.agentName ? { agentName: body.agentName } : {}),
    ...(body.agentImage ? { agentImage: body.agentImage } : {}),
    ...(body.position ? { position: body.position } : {}),
    ...(body.yearsOfExperience
      ? { yearsOfExperience: body.yearsOfExperience }
      : {}),
    ...(body.languages ? { languages: body.languages } : {}),
    ...(body.rera ? { rera: body.rera } : {}),
    ...(body.orn ? { orn: body.orn } : {}),
    ...(body.phoneNumber ? { phoneNumber: body.phoneNumber } : {}),
    ...(body.whatsAppNumber ? { whatsAppNumber: body.whatsAppNumber } : {}),
  };

  const agent = await agentService.registerAgentService(agentBody);
  return res.status(201).json({
    status: 201,
    message: 'Successfully registered agent',
    data: [agent],
  });
}

async function loginAgent(req, res) {
  const body = { ...req.body };
  const { token, id } = await agentService.loginAgentService(body);

  return res
    .header('auth-token', token)
    .header('role', 'AGENT')
    .header('id', id)
    .status(200)
    .json({ status: 200, message: 'You are logged in' });
}

async function listAgent(req, res) {
  const agents = await agentService.listAgentService();
  return res.status(200).json({ status: 200, data: agents });
}

async function listAgentById(req, res) {
  const { id } = req.params;

  const agent = await agentService.listAgentByIdService(id);
  return res.status(200).json({ status: 200, data: [agent] });
}

async function updateAgentById(req, res) {
  const { id } = req.params;
  const body = { ...req.body };
  const agent = await agentService.updateAgentById(id, body);
  return res.status(200).json({
    status: 200,
    message: 'Successfully updated Agent',
    data: [agent],
  });
}

async function deleteAgentById(req, res) {
  const { id } = req.params;
  await agentService.deleteAgentById(id);

  return res.status(200).json({
    status: 200,
    message: 'Successfully deleted Agent',
  });
}

async function listAgentByAgency(req, res) {
  const { id } = req.params;

  const agent = await agentService.listAgentByAgencyService(id);
  return res.status(200).json({ status: 200, data: agent });
}

module.exports = {
  registerAgent: [verify, authRole(['ADMIN', 'AGENCY']), registerAgent],
  loginAgent: [loginAgent],
  listAgent: [verify, authRole(['ADMIN', 'AGENCY']), listAgent],
  listAgentByAgency: [verify, authRole(['ADMIN', 'AGENCY']), listAgentByAgency],
  listAgentById: [verify, authRole(['ADMIN', 'AGENCY']), listAgentById],
  updateAgentById: [verify, authRole(['ADMIN', 'AGENCY']), updateAgentById],
  deleteAgentById: [verify, authRole(['ADMIN', 'AGENCY']), deleteAgentById],
};
