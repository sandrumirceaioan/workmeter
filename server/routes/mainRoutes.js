var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/',function(req, res) {
  res.render('index.html');
});

//#GetAll
router.get('/greet', function (req, res) {
  return res.status(200).json({greet: 'Hello!'});
 });

module.exports = router;