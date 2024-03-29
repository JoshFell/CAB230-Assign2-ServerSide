var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/administration');
var countriesRouter = require('./routes/countries');
var volcanoesRouter = require('./routes/volcanoes')

var app = express();

app.use(cors());

const options = require('./knexfile.js');
const knex = require('knex')(options);

// const swaggerUI = require('swagger-ui-express');
// const swaggerDocument = require('./docs/swagger.json');

app.use((req, res, next) => {
  req.db = knex
  next()
 })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// routes
app.use('/me', adminRouter);
app.use('/countries', countriesRouter);
app.use('/', volcanoesRouter);


// app.get('/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

app.use("/", swaggerUi.serve);
app.get(
  "/",
  swaggerUi.setup(swaggerDoc, {
    swaggerOptions: { defaultModelsExpandDepth: -1 }, // Hide schema section
  })
);

// app.get('/knex', function(req,res,next) {
//   req.db.raw("SELECT VERSION()").then(
//   (version) => console.log((version[0][0]))
//   ).catch((err) => { console.log( err); throw err })
//   res.send("Version Logged successfully");
//  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
