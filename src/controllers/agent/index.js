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
    agencyId: body,
    agencyId,
    ...(body.agentName ? { agentName: body.agentName } : {}),
    ...(body.agentImage ? { agentImage: body.agentImage } : {}),
    ...(body.position ? { position: body.position } : {}),
    ...(body.yearsOfExperience
      ? { yearsOfExperience: body.yearsOfExperience }
      : {}),
    ...(body.languages ? { languages: body.languages } : {}),
    ...(body.agencyName ? { agencyName: body.agencyName } : {}),
    ...(body.agencyLogo ? { agencyLogo: body.agencyLogo } : {}),
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
  const token = await agentService.loginAgentService(body);

  return res
    .header('auth-token', token)
    .header('role', 'AGENT')
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

module.exports = {
  registerAgent: [verify, authRole(['ADMIN']), registerAgent],
  loginAgent: [loginAgent],
  listAgent: [verify, authRole(['ADMIN']), listAgent],
  listAgentById: [verify, authRole(['ADMIN']), listAgentById],
  updateAgentById: [verify, authRole(['ADMIN']), updateAgentById],
  deleteAgentById: [verify, authRole(['ADMIN']), deleteAgentById],
};
