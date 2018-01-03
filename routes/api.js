const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/todos', (req, res) => {
  res.status(200).json({suka:'bleath!!!'});
});

module.exports = router;