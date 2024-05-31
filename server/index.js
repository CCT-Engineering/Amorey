// REQUIRE STATEMENTS
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const cors = require('cors');
const favicon = require('serve-favicon');
const compression = require('compression');
const sessionHandler = require('./session-handler');

const app = express();

// APP-WIDE MIDDLEWARE
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// STATIC SERVICE OF ASSETS
console.log('__dirname:', __dirname);
console.log(path.join(__dirname, '../client/dist'));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

// ROUTES
app.all('/api/*', (req, res) => {
  const reqPath = req.url.replace('/api/', '');
  axios({
    method: req.method,
    url: `${process.env.API_URL}${reqPath}`, // req.url will include query (?) and params (:)
    data: req.body,
    headers: {
      'User-Agent': 'request', // this might not be necessary?
      Authorization: process.env.AUTH,
    },
  })
    .then((resAPI) => res.status(resAPI.status).send(resAPI.data))
    .catch((errAPI) => {
      if (errAPI.response) {
        res.status(errAPI.response.status).send(errAPI);
      } else {
        res.sendStatus(404);
      }
    });
});

// Serve the React Application
app.get('*', (req, res) => {
  console.log('* Endpoint HIT!');
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// PORT AND SERVER LISTEN
const PORT = process.env.PORT || 3300;
app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
