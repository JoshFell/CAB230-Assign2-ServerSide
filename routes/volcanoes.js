var express = require('express');
var router = express.Router();

router.get('/volcanoes', function(req, res, next){
  console.log(req.query);

  if (Object.keys(req.query).length < 1 || !req.query.country){
    res.status(400).json({"error": true, "message": "Country is a required query parameter."})
    return;
  }

  if (req.query.populatedWithin === "5km" || 
    req.query.populatedWithin === "10km" || 
    req.query.populatedWithin === "30km" ||
    req.query.populatedWithin === "100km"){
      req.db.from('data').select('id','name', 'country', 'region', 'subregion').where('country', '=', req.query.country).andWhere(`population_${req.query.populatedWithin}`, '>', 0)
      .then(
        rows => {
          res.json(rows);
        })
      }
    else{
      req.db.from('data').select('id','name', 'country', 'region', 'subregion').where('country', '=', req.query.country)
      .then(
        rows => {
          res.json(rows)
        })
      .catch(err => {
        console.log(err);
        res.json({
          Error: true,
          Message: "Country is a required query parameter."
        })
      });
    }
  });
  
  router.get('/volcano/:id', function(req, res, next){
    if (Object.keys(req.query).length > 0){
      res.status(400).json({"error": true, "message": "Invalid query parameters. Query parameters are not permitted."});
      return;
    }

    req.db.from('data').select('*').where('id', '=', req.params.id)
    .then((rows) => {
      if (!rows[0]){
        res.status(404).json({"error": true,"message": `Volcano with ID: ${req.params.id} not found.`});
        return;
      }
      res.status(200).json(rows[0])
    })
  });

  module.exports = router;