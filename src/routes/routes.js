const express = require('express');
const router = express.Router();

//location
const locationRoutes = require('../controllers/location');

router.post('/location', locationRoutes.searchLocation);

// property
const propertyRoutes = require('../controllers/property');

router.post('/property', propertyRoutes.addProperty);
router.get('/property', propertyRoutes.listProperty);
router.get('/property/:id', propertyRoutes.listPropertyById);
router.patch('/property/:id', propertyRoutes.updatePropertyById);
router.delete('/property/:id', propertyRoutes.deletePropertyById);

router.get('/agent/property', propertyRoutes.listPropertyByAgent);
router.get('/agent/property/:id', propertyRoutes.listPropertyByIdByAgent);
router.patch('/agent/property/:id', propertyRoutes.updatePropertyByAgent);
router.delete('/agent/property/:id', propertyRoutes.deletePropertyByAgent);

// agent
const agentRoutes = require('../controllers/agent');

router.post('/register-agent', agentRoutes.registerAgent);
router.post('/login-agent', agentRoutes.loginAgent);
router.get('/agent', agentRoutes.listAgent);
router.get('/agent/:id', agentRoutes.listAgentById);
router.patch('/agent/:id', agentRoutes.updateAgentById);
router.delete('/agent/:id', agentRoutes.deleteAgentById);

module.exports = router;
