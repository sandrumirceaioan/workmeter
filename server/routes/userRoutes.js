const express = require('express');
const router = express.Router();
var _ = require('underscore');
let users = require('../models/users.js');

//----------------------------------------------------------------------------------------------------
// Model Schema Errors
//----------------------------------------------------------------------------------------------------
function parseError(err) {
  var errorString = '';
  if (err.errors) {
    for (var key in err.errors) {
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
// 
//----------------------------------------------------------------------------------------------------
router.get('/',function(req, res) {
  res.render('index.html');
});

//----------------------------------------------------------------------------------------------------
// say hi
//----------------------------------------------------------------------------------------------------
router.get('/salut', function (req, res) {
  return res.status(200).json({greet: 'salut!'});
 });


//----------------------------------------------------------------------------------------------------
// add user
//----------------------------------------------------------------------------------------------------
 router.post('/register', function(req, res){
  users.findOne(_.pick(req, 'email')).then(function(){
          savedata = _.compact(req.body);
          var user = new users(req.body);
          return user.save();
      }).then(function(user){
          res.status(200).json(user);
      }).catch(function(err){
          res.status(500).json(parseError(err));
      });
  
  });

module.exports = router;