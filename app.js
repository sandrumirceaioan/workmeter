// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// connect to mongoDB @ mlab
mongoose.connect('mongodb://pretenash:rappac33!@ds139436.mlab.com:39436/tododb', {
  useMongoClient: true
});

// Get our API routes
const api = require('./server/routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Get port from environment
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));