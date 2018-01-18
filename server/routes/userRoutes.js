const express = require('express');
const router = express.Router();
var Promise = require("bluebird");
let _ = require('lodash');
let async = require('async');
let jwt = require('jwt-then');
let md5 = require('md5');
let users = require('../models/users.js');

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
// user route
//----------------------------------------------------------------------------------------------------
router.get('/',function(req, res) {
  res.render('index.html');
});

//----------------------------------------------------------------------------------------------------
// register user
//----------------------------------------------------------------------------------------------------
router.post('/register', function (req, res) {

  let params = _.merge(req.body, req.query);
  let orArray = [];

  orArray.push({userName: {$regex: new RegExp("^" + params.userName + "$", "i")}});
  orArray.push({emailAddress: {$regex: new RegExp("^" + params.emailAddress + "$", "i")}});

  let filter = {
    $or: orArray
  };

  users.findOne(filter).then(function(user){
    if (user) throw {message:'User already registered!'};
    return;
  }).then(function(){
    let JWT = {
      KEY: 's0!p3n~d34m0$pr4l3*',
      ALGORITHMS: 'HS512'
    }
    return jwt.sign({
      u: params.userName,
      i: params.invitationCode || '77777'
    }, JWT.KEY, {
      algorithm: JWT.ALGORITHMS,
      noTimestamp: true
    });
  }).then(function(token){
    let salt = '4m0$pr4l3*s0!p3n~d3';
    params.token = token;
    params.password = md5(params.password + salt);
    let user = new users(params);
    return user.save();
  }).then(function(registered){
    res.status(200).json(registered);
  }).catch(function(error){
    res.status(500).json(error);
  });

});

module.exports = router;