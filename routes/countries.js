var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    req.db.from('data').distinct('country').orderBy('country')
    .then((rows) => {
      res.status(200).json(rows.map((country) => country.country));
      
    })
    .catch(err => {
      console.log(err);
      res.json({
        Error: true,
        Message: "Invalid query parameters. Query parameters are not permitted."
      })
    })
  })

  module.exports = router;
  