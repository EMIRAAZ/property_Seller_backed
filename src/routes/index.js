const express = require('express');
const router = express.Router();

const routes = require('./routes');
const imageRoutes = require('./image-upload');

router.use('/api', routes);
router.use('/image', imageRoutes);

module.exports = router;
