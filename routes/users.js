var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user/register', function(req, res, next){
  res.status(200).json({})
});

module.exports = router;
