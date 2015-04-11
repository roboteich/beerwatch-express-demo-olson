var express = require('express')
  , router = express.Router()
  , Pour = require('../models/pour')
  , _ = require("underscore")


router.get("/user/:user_id/pour", function(req, res){

  console.log("user_id: " + req.params.user_id);

  var querySpec = {
          query: "SELECT * FROM root r WHERE r.user_id=@user_id AND r.type='pour'",
          parameters:[{
            name:"@user_id",
            value:req.params.user_id
          }]
      };

  Pour.find(querySpec, function(err, items){
      if(err){
          throw (err);
      }

      res.json(_.sortBy(items, 'last_updated'));

  });

});

// router.get('/user/:user_id/stats', function(req, res){

//   var user = req.params.user_id;

//   //get all the beer ids, counts of a users pours
//   var querySpec = {
//         query: "SELECT beer_id, poured_on FROM root r WHERE r.user_id=@user_id AND r.type='pour'",
//         parameters:[{
//           name:"@user_id",
//           value:req.params.user_id
//         }]
//     };

//   Pour.find(querySpec, function(err, items){
//     if(err){
//         throw(err)
//     }
      
//     var itemsById = _.groupBy()

//   });

//   //get all the beer families of the 

//   Pour.find(querySpec, function(err, items){

// });

router.put('/user/:user_id/pour/:beer_id', function(req, res){

  var user = req.params.user_id;

  console.log('pour user_id: ', req.params);

  var dbQuery = "SELECT * FROM root r"
  + " WHERE r.user_id=@user_id"
  + " AND r.beer_id=@beer_id" 
  + " AND r.type='pour'";

  var querySpec = {
    query: dbQuery,
    parameters: [
      {
        name:"@user_id",
        value:req.params.user_id
      },
      {
        name:"@beer_id",
        value:req.params.beer_id
      }
    ]
  }

  Pour.find(querySpec, function(err, items){
    
    var pourResource = {};
    var now = Date.now();
    var pour_date = req.body.poured_on || now;
    var rating = req.body.rating || null; 

    if(err){
      console.log(err);
      throw(err);
    }

    if(_.isEmpty(items)){

      _.extend(pourResource, {
        type:"pour",
        user_id:user,
        beer_id:req.params.beer_id,
        poured_on:[now],
        rating:rating
      });

      Pour.create(pourResource, function(err, item){
        
        if(err){
          throw(err);
        }

        res.json(item);

      });

    }else{

      pourResource = items[0];
      pourResource.poured_on.unshift(pour_date);
      if(rating) pourResource.rating = rating;

      Pour.save(pourResource.id, pourResource, function(err, item){

        if(err){
          throw(err);
        }

        res.json(item);

      });

    }

 });

});

module.exports = router;