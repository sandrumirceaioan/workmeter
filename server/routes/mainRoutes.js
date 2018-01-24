const express = require('express');
const router = express.Router();
var Promise = require("bluebird");
let _ = require('lodash');
let async = require('async');
let features = require('../models/features.js');

/* GET users listing. */
router.get('/',function(req, res) {
  res.render('index.html');
});

//----------------------------------------------------------------------------------------------------
// get allowed user features 
//----------------------------------------------------------------------------------------------------
router.post('/features', function (req, res) {
  let params = _.merge(req.body, req.query);
  console.log('-----------------------');
  console.log(params);
  console.log('-----------------------');

  let filter = {
    rank: {$gte: params.userType}
  };
  features.find(filter).then(function(features){
    if (features.length === 0) throw {message:'No feature available!'};
    return features;
  }).then(function(dbfeatures){
    res.status(200).json(dbfeatures);
  }).catch(function(error){
    console.log(error);
    res.status(500).json(error);
  });
});

module.exports = router;