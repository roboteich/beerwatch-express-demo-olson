var express = require('express');
var router = express.Router();

/* beers */
//router.use('/activity', require('./activity'));
router.use('/beers', require('./beers'));
router.use(require('./pours'));
// router.use('/users', require('./users'));

/* GET home page. */
router.get('/', function(req, res){
  res.json({message: 'hooray! welcome to our api'});
});

module.exports = router;
