const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const errorDetailsResponseMiddleware = require('./middleware/detailed-error-response');

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ exposedHeaders: ['auth-token', 'role'] }));

// DB
require('./database/dbConnection');

// routes
app.use(router);

app.use('/', (req, res) => {
  res.send('welcome to uaeassistant');
});

app.use(errorDetailsResponseMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app is listening to port ${PORT}`);
});
