const express = require('express');
const router = express.Router();
var Promise = require("bluebird");
let _ = require('lodash');
let async = require('async');
let projects = require('../models/projects.js');

//----------------------------------------------------------------------------------------------------
// Model Schema Errors
//----------------------------------------------------------------------------------------------------
function parseError(err) {
  let errorString = '';
  if (err.errors) {
    for (let key in err.errors) {
      if (err.errors[key].message) {
        if (err.errors[key].path) {
          errorString += err.errors[key].message.replace('`{PATH}`', err.errors[key].path) + ' ';
        } else {
          errorString += err.errors[key].message + ' ';
        }
      }
    }
    errorString = JSON.stringify(errorString);
  } else {
    errorString = JSON.stringify(err.message);
  }
  return errorString;
}

//----------------------------------------------------------------------------------------------------
// add project
//----------------------------------------------------------------------------------------------------
router.post('/add', function (req, res) {
  let params = _.merge(req.body, req.query);

  let filter = {
    projectName: {$regex: new RegExp("^" + params.projectName + "$", "i")}
  };

  projects.findOne(filter).then(function(user){
    if (user) throw {message:'Project already exist!'};
    return;
  }).then(function(token){
    let project = new projects(params);
    return project.save();
  }).then(function(added){
    res.status(200).json(added);
  }).catch(function(error){
    res.status(500).json(error);
  });
});

//----------------------------------------------------------------------------------------------------
// get all projects 
//----------------------------------------------------------------------------------------------------
router.post('/getAll', function (req, res) {
  let params = _.merge(req.body, req.query);
  projects.find({}).sort({projectCreated: -1}).then(function(projects){
    return projects;   
  }).then(function(dbprojects){
    res.status(200).json(dbprojects);
  }).catch(function(error){
    console.log(error);
    res.status(401).json(error);
  });
});

module.exports = router;