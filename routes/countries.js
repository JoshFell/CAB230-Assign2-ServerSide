var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
  console.log(req.query);
  console.log(Object.keys(req.query).length);

  if (Object.keys(req.query).length > 0){
    res.json({"error": true, "message": "Invalid query parameters. Query parameters are not permitted."});
  }

  else{
    req.db.from('data').distinct('country').orderBy('country')
    .then((rows) => {
      res.status(200).json(rows.map((country) => country.country));
    })
  }
});

  module.exports = router;
  