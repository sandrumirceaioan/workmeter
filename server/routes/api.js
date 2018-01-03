const express = require('express');
const router = express.Router();
const todos = require('../models/todo');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/whatToDo', function(req,res){
  todos.find({}).then(function(result){
    res.status(200).json(result);
  }).catch(function(err){
    res.status(500).json(err);
  });
});

module.exports = router;