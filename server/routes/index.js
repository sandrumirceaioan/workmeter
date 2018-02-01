// It contains all root routes
var express = require('express');
var router = express.Router();

var mainRoutes = require('./mainRoutes');
var userRoutes = require('./userRoutes');

/* Main API Routes */
router.use('/main', mainRoutes);

/* User routes */
router.use('/user', userRoutes);

module.exports = router;