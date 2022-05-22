const express = require('express');

const router = express.Router();

// property

router.post('/property');
router.get('/property');
router.get('/property/:id');
router.patch('/property/:id');
router.delete('/property/:id');
