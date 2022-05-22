const crypto = require('crypto');
const jwt = require('jsonwebtoken');

require('dotenv').config();

exports.generateUniqueID = (bytes = 6) =>
  crypto.randomBytes(bytes).toString('hex');

exports.generateAccessToken = user =>
  jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '7d' });
