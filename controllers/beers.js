var express = require('express')
  , router = express.Router()
  , Beer = require('../models/beer')


router.route("/")
  
  .post(function(req, res) {

    Beer.create(req.body, function(err, item){

      if(err){
        throw (err);
      }

      res.json(item);

    });

  })

  .get(function(req, res){

    var querySpec = {
            query: 'SELECT * FROM root r',
            parameters:[]
        };

    Beer.find(querySpec, function(err, items){
        if(err){
            throw (err);
        }

        res.json(items);

    });

  });

router.route('/:beer_id')

  .get(function(req, res) {

    Beer.findOne(req.params.beer_id, function(err, beer){
      
      if(err){
        res.send(err);
      }

      res.json(beer);

    });

  })

  .put(function(req, res){

    Beer.save(req.params.beer_id, req.body, function(err, beer){
      
      if(err){
        res.send(err);
      }

      res.json(beer);

    });

  });

module.exports = router