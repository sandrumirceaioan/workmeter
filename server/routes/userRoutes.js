const express = require('express');
const router = express.Router();
let _ = require('lodash');
let async = require('async');
let jwt = require('jsonwebtoken');
let md5 = require('md5');
let users = require('../models/users.js');

// function(req, res){
//   users.findOne(_.pick(req, 'email')).then(function(){
//           savedata = _.compact(req.body);
//           let user = new users(req.body);
//           return user.save();
//       }).then(function(user){
//           res.status(200).json(user);
//       }).catch(function(err){
//           console.log(err);
//           res.status(500).json(parseError(err));
//       });
  
//   }

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
    console.log('-----------params: ',params);
    let userStore = {};
    async.series({
      function (callback) {

        let tempFilter = [];

        tempFilter.push({userName: {$regex: new RegExp("^" + params.userName + "$", "i")}});
        tempFilter.push({emailAddress: {$regex: new RegExp("^" + params.emailAddress + "$", "i")}});

        let filter = {
          $or: tempFilter
        };
        console.log('-------------filter: ',filter);
        users.findOne(filter, function(error, result){
          if (!_.isEmpty(error)) {
            return callback(error);
          }
          if (!_.isEmpty(result)) {
            return callback('Username or email already registered!');
          }
          return callback(null,result);
        });

      },

      function (callback) {

        let JWT = {
          KEY: 's0!p3n~d34m0$pr4l3*',
          ALGORITHMS: 'HS512'
        };
        
        jwt.sign({
            u: params.userName,
            i: params.invitationCode || '77777'
          }, JWT.KEY, {
            algorithm: JWT.ALGORITHMS,
            noTimestamp: true
          }, function (err, token) {
            params.token = token;
            console.log('------------params2: ',params);
            return callback(null,params);
          });

      },

      function (callback) {
        console.log('addddd?????????');
        let MD5 = {
          SALT: 's0!p3n~d34m0$pr4l3*',
          PEPPER: '4m0$pr4l3*s0!p3n~d3'
        };

        if (_.isEmpty(params.token) || _.isUndefined(params.token)) {
          return callback(('Could not completed registration please try again or contact administrator!'), null);
        }

        let newUser = params;
        newUser.password = md5(MD5.SALT + password + MD5.PEPPER);
        newUser.type = params.type || 0;
        newUser.status = params.status || 0;

        console.log('---------newUser: ', newUser);
        // users.save(newUser).then(function (result) {
        //   let userStore = result;
        //   return callback();
        // }).catch(function(error){
        //   return callback(error.errors);
        // });
        users.save(newUser, function (error, result) {
          if (!_.isEmpty(error) || _.isEmpty(result)) {
            var validationErrors = '';
            Object.keys(error.errors).forEach(function (key) {
              validationErrors += error.errors[key].message + '<br />';
            });
            if (validationErrors === '') {
              validationErrors = 'Could not completed registration please try again or contact the administrator!';
            }
            return callback(null, result);
          }
          userStore = result;
          return callback(null,userStore);
        });

      }
    }, function (error, results) {
        console.log('ajunge aici err: ',error, results);
      if (!_.isEmpty(error)) {
        res.status(500).json(error);
      } else {
        res.status(200).json(userStore);
      }

    });
});

module.exports = router;