//----------------------------
//  Properties
//----------------------------

//configuration parameters
var config = require('./config');

//data sources
var DocumentDBClient = require('documentdb').DocumentClient;

//models
var Beer = require('./models/beer');
var Pour = require('./models/pour');

//server 
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//----------------------------
//  Initialize Parameters
//----------------------------

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

//---------------------------
//  Configure Server
//---------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//------------------------
//  Initialize Models
//------------------------

var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});

Pour.setDb(docDbClient, config.databaseId, config.collections.activity);
Beer.setDb(docDbClient, config.databaseId, config.collections.beer);

//------------------------
//  Route Actions
//------------------------

//setup rest routing
var router = express.Router();

router.get('/', function(req, res){
  res.json({message: 'hooray! welcome to our api'});
});

router.use('/api', require('./controllers/api'));
app.use(router);

//------------------------
//  Errors
//------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
