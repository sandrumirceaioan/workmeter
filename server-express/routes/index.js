// It contains all root routes
var express = require('express');
var router = express.Router();

var mainRoutes = require('./mainRoutes');
var userRoutes = require('./userRoutes');
var projectRoutes = require('./projectRoutes');

/* Main API Routes */
router.use('/main', mainRoutes);

/* User routes */
router.use('/user', userRoutes);

/* Project routes */
router.use('/project', projectRoutes);

module.exports = router;