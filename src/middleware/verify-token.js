const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) return res.status(401).send('Access denied no token');
  token = token.length > 7 && token.substring(7, token.length);
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = verify;
