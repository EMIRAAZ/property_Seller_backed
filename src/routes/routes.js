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
router.get('/agency/property', propertyRoutes.listPropertyByAgency);
router.get('/agent/property/:id', propertyRoutes.listPropertyByIdByAgent);
router.patch('/agent/property/:id', propertyRoutes.updatePropertyByAgent);
router.delete('/agent/property/:id', propertyRoutes.deletePropertyByAgent);

// agency
const agencyRoutes = require('../controllers/agency');

router.post('/agency', agencyRoutes.addAgency);
router.get('/agency', agencyRoutes.listAgency);
router.post('/login-agency', agencyRoutes.loginAgency);
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

const tagheadRoutes = require('../controllers/tagheads');

router.post('/taghead', tagheadRoutes.addtagheads);
router.get('/taghead', tagheadRoutes.listtagheads);
router.get('/taghead/:id', tagheadRoutes.listtagheadsById);
router.patch('/taghead/:id', tagheadRoutes.updatetagheadsById);
router.delete('/taghead/:id', tagheadRoutes.deletetagheadsById);

const taglineRoutes = require('../controllers/tagline');

router.post('/tagline', taglineRoutes.addtagline);
router.get('/tagline', taglineRoutes.listtagline);
router.get('/tagline/:id', taglineRoutes.listtaglineById);
router.get('/tagline/taghead/:id', taglineRoutes.listtaglineByTagHeadId);
router.patch('/tagline/:id', taglineRoutes.updatetaglineById);
router.delete('/tagline/:id', taglineRoutes.deletetaglineById);

const newstopicsRoutes = require('../controllers/newstopics');

router.post('/newstopics', newstopicsRoutes.addnewstopics);
router.get('/newstopics', newstopicsRoutes.listnewstopics);
router.get('/newstopics/:id', newstopicsRoutes.listnewstopicsById);
router.patch('/newstopics/:id', newstopicsRoutes.updatenewstopicsById);
router.delete('/newstopics/:id', newstopicsRoutes.deletenewstopicsById);

const newsRoutes = require('../controllers/news');

router.post('/news', newsRoutes.addnews);
router.get('/news', newsRoutes.listnews);
router.get('/news/:id', newsRoutes.listnewsById);
router.patch('/news/:id', newsRoutes.updatenewsById);
router.delete('/news/:id', newsRoutes.deletenewsById);

const blogRoutes = require('../controllers/blog');

router.post('/blog', blogRoutes.addblog);
router.get('/blog', blogRoutes.listblog);
router.get('/blog/:id', blogRoutes.listblogById);
router.patch('/blog/:id', blogRoutes.updateblogById);
router.delete('/blog/:id', blogRoutes.deleteblogById);

const cityRoutes = require('../controllers/city');

router.post('/city', cityRoutes.addCity);
router.get('/city/emirate', cityRoutes.listCityByEmirate);
router.get('/city', cityRoutes.listCity);
router.get('/city/:id', cityRoutes.listCityById);
router.patch('/city/:id', cityRoutes.updateCity);
router.delete('/city/:id', cityRoutes.deleteCity);

const advertiseClientRoutes = require('../controllers/advertiseclient');

router.post('/advertise-with-us', advertiseClientRoutes.addadvertiseClient);
router.get('/advertise-with-us', advertiseClientRoutes.listadvertiseClient);

module.exports = router;
