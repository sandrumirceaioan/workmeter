// Get dependencies
const express = require('express');
const engines = require('consolidate');
const app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./server/routes/index');
mongoose.Promise = require('bluebird');

// parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect to mongoDB @ mlab
mongoose.connect('mongodb://admin:rappac33!@ds247357.mlab.com:47357/tmwm', {
  useMongoClient: true
});

// set view engine to html
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/dist'));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

// set api routes
app.use('/api', apiRoutes);

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

// get port from environment
const port = process.env.PORT || '3000';
app.set('port', port);

// create HTTP server
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));