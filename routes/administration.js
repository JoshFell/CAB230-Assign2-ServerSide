var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.json({
      "name": "Josh Fell", 
      "student_number": "n10163140"
    });
  })

module.exports = router;