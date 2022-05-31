const express = require('express');
const router = express.Router();

const routes = require('./routes');
const admin = require('./admin-routes');
const imageRoutes = require('./image-upload');
const svgRoutes = require('./svg-upload');

router.use('/api', routes);
router.use('/admin', admin);
router.use('/image', imageRoutes);
router.use('/svg', svgRoutes);

module.exports = router;
