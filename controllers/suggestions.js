var express = require('express')
  , router = express.Router()
  , Beer = require('../models/beer')


router.get("/user/:user_id/suggestions", function(req, res){

  switch(req.params.mode){
    case "norm":
      //stub in
      res.json([]);
      break;
    case "adventure":
      //stub in
      res.json([]);
      break;
    default:
      //stub in
      res.json([]);
      break;
  }

});

module.exports = router