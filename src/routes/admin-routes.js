const express = require('express');
const router = express.Router();

// admin
const adminRoutes = require('../controllers/admin');

// router.post('/register-admin', adminRoutes.registerAdmin);
router.post('/login-admin', adminRoutes.loginAdmin);

module.exports = router;
