// It contains all root routes
var express = require('express');
var router = express.Router();

var mainRoutes = require('./mainRoutes');

/* Main API Routes */
router.use('/main', mainRoutes);

module.exports = router;