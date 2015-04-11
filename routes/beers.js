var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

function Beers(bearDao){
    this.bearDao = bearDao;
}

Beers.prototype = {
    showBeers: function (req, res){
        var self = this;

        var querySpec = {
            query: 'SELECT * FROM root r',
            parameters:[]
        };

        self.beerDao.find(querySpec, function(err, items){
            if(err){
                throw (err);
            }

            res.render('index', {
                title:'My Beers',
                beers: items
            });

        });
    },

    addBeer: function(req, res){
        var self = this;
        var item = req.body;

        self.beerDao.addItem(item, function(err) {
            if(err){
                throw(err);
            }

            res.redirect('/');
        });
    },


}

module.exports = Beers;