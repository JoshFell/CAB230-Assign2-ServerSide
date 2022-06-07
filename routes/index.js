var express = require('express');
const req = require('express/lib/request');
const { status } = require('express/lib/response');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Assignment 2' });
});

router.get('/me', function(req, res, next){
  res.json({
    "name": "Josh Fell", 
    "student_number": "n10163140"
  });
})

router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Lots of routes available' });
});

router.get('/countries', function(req, res, next){
  req.db.from('data').select('country')
  .then((rows) => {
    res.json({
      Error: false,
      Message: "Success",
      data: rows 
    })
  })
  .catch(err => {
    console.log(err);
    res.json({
      Error: true,
      Message: "Invalid query parameters. Query parameters are not permitted."
    })
  })
})

router.get('/volcanoes', function(req, res, next){
  req.db.from('data').select('id','name', 'country', 'region', 'subregion').where('country', '=', req.query.country)
  .then(
    rows => {
      res.json({
        Error: false,
        Message: "success",
        data: rows
      })
    })
  .catch(err => {
    console.log(err);
    res.json({
      Error: true,
      Message: "Country is a required query parameter."
    })
  });
});

router.get('/volcano/:id', function(req, res, next){
  req.db.from('data').select('*').where('id', '=', req.params.id)
  .then((rows) => {
      res.json({"volcanoes": rows})
  })
  .catch((err) => {
    // console.log(err);
    // res.json({"Error": true, "Message": "Error executing SQL query"})
    res.status(404).json({"error": true, "message": `Volcano with ID: ${req.params.id} not found.`})
  })
});

module.exports = router;
