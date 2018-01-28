const express = require('express');
const router = express.Router();
var Promise = require("bluebird");
let _ = require('lodash');
let async = require('async');

/* GET users listing. */
router.get('/',function(req, res) {
  res.render('index.html');
});

module.exports = router;