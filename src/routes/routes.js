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

// agency
const agencyRoutes = require('../controllers/agency');

router.post('/agency', agencyRoutes.addAgency);
router.get('/agency', agencyRoutes.listAgency);
router.get('/agency/:id', agencyRoutes.listAgencyById);
router.patch('/agency/:id', agencyRoutes.updateAgencyById);
router.delete('/agency/:id', agencyRoutes.deleteAgencyById);

// agent
const agentRoutes = require('../controllers/agent');

router.post('/register-agent', agentRoutes.registerAgent);
router.post('/login-agent', agentRoutes.loginAgent);
router.get('/agent', agentRoutes.listAgent);
router.get('/agent/agency/:id', agentRoutes.listAgentByAgency);
router.get('/agent/:id', agentRoutes.listAgentById);
router.patch('/agent/:id', agentRoutes.updateAgentById);
router.delete('/agent/:id', agentRoutes.deleteAgentById);

// featured
const featuredRoutes = require('../controllers/featured');

router.get('/featured', featuredRoutes.listFeaturedProperty);

// amenity

const amenityRoutes = require('../controllers/amenity');

router.post('/amenity', amenityRoutes.addAmenity);
router.get('/amenity', amenityRoutes.listAmenity);
router.get('/amenity/:id', amenityRoutes.listAmenityById);
router.patch('/amenity/:id', amenityRoutes.updateAmenityById);
router.delete('/amenity/:id', amenityRoutes.deleteAmenityById);

const offplanRoutes = require('../controllers/offplan');

router.post('/offplan', offplanRoutes.addOffplan);
router.get('/offplan', offplanRoutes.listOffplan);
router.get('/offplan/:id', offplanRoutes.listOffplanById);
router.patch('/offplan/:id', offplanRoutes.updateOffplanById);
router.delete('/offplan/:id', offplanRoutes.deleteOffplanById);

const famousNeighborhoodRoutes = require('../controllers/famousneighborhood');

router.post(
  '/famousneighborhood',
  famousNeighborhoodRoutes.addFamousNeighborhood
);
router.get(
  '/famousneighborhood',
  famousNeighborhoodRoutes.listFamousNeighborhood
);
router.get(
  '/famousneighborhood/:id',
  famousNeighborhoodRoutes.listFamousNeighborhoodById
);
router.patch(
  '/famousneighborhood/:id',
  famousNeighborhoodRoutes.updateFamousNeighborhoodById
);
router.delete(
  '/famousneighborhood/:id',
  famousNeighborhoodRoutes.deleteFamousNeighborhoodById
);

module.exports = router;
