const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { generateAccessToken } = require('../../utils');

const Agent = require('../../models/Agent');

async function registerAgentService(body) {
  const agentBody = { ...body };

  const isExistingAgent = await Agent.findOne({
    where: {
      username: agentBody.username,
    },
  });
  if (isExistingAgent)
    throw new Error(createError(409, 'Agent already exists', { status: 409 }));

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(agentBody.password, salt);
  agentBody.password = hashedPassword;

  const agent = await Agent.create({ ...agentBody });
  agent.password = 'encrypted!';
  return agent;
}

async function loginAgentService(body) {
  const credentials = { ...body };

  const agent = await Agent.findOne({
    where: { username: credentials.username },
  });
  if (!agent) throw new Error('username or password is wrong');

  const checkIfPasswordValid = await bcrypt.compare(
    credentials.password,
    agent.password
  );
  if (!checkIfPasswordValid) throw new Error('Invalid password');

  const user = {
    _id: agent.id,
    role: agent.role,
  };

  const token = generateAccessToken(user);
  return { token, id: agent.id };
}

async function listAgentService() {
  const agents = await Agent.findAll();
  return agents;
}

async function listAgentByIdService(id) {
  const agent = await Agent.findByPk(id);
  return agent;
}

async function listAgentByAgencyService(agencyId) {
  const agent = await Agent.findAll({ where: { agencyId: agencyId } });
  return agent;
}

async function updateAgentById(id, body) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);
  body.password = hashedPassword;
  const agent = await Agent.update({ ...body }, { where: { id: id } });
  return agent;
}

async function deleteAgentById(id) {
  const agent = await Agent.destroy({ where: { id: id } });
  return agent;
}

module.exports = {
  registerAgentService,
  loginAgentService,
  listAgentService,
  listAgentByIdService,
  updateAgentById,
  deleteAgentById,
  listAgentByAgencyService,
};
