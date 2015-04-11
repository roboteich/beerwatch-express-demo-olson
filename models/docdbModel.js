var DocumentDBClient = require('documentdb').DocumentClient;
var docdbUtils = require('../helpers/docdbUtils');
var _ = require('underscore');
var uuid = require('node-uuid');

var DocDBModel = {}

DocDBModel.setDb = function(documentDBClient, databaseId, collectionId, callback) {
    var self = this;

      this.client = documentDBClient;
      this.databaseId = databaseId;
      this.collectionId = collectionId;

      this.database = null;
      this.collection = null;

    docdbUtils.getOrCreateDatabase(self.client, self.databaseId, function(err, db){
        if (err) {
            
            callback(err);

        } else {

            self.database = db;

            docdbUtils.getOrCreateCollection(self.client, self.database._self, self.collectionId, function(err, coll){
                if(err){
                    callback(err);
                } else {
                    self.collection = coll;
                }
            });

        }
    });
}

DocDBModel.find = function(querySpec, callback) {
    var self = this;

    self.client.queryDocuments(self.collection._self, querySpec).toArray(function(err, results) {
        if(err){
            callback(err);
        }else {
            callback(null, results);
        }
    });
}

DocDBModel.findOne = function(itemId, callback){
    var self = this;
    
    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [{
            name: '@id',
            value: itemId
        }]
    };

    self.client.queryDocuments(self.collection._self, querySpec).toArray(function (err, results) {
        if (err) {
            callback(err);

        } else {
            callback(null, results[0]);
        }
    });
}

DocDBModel.create = function(item, callback){
    var self = this;
    var now = Date.now();

    item.created_date = now;
    item.last_updated = now;
    item.id = uuid.v1();

    self.client.createDocument(self.collection._self, item, function(err, doc){
        if(err){
            callback(err);
        }else {
            callback(null, doc);
        }
    });
}

DocDBModel.save = function(itemId, item, callback){
    var self = this;
    var now = Date.now();

    item.last_updated = now;

    self.findOne(itemId, function(err, doc){
        if(err){
            callback(err);
        } else {
            

            var newDoc = _.extend(doc, item);

            self.client.replaceDocument(doc._self, newDoc, function(err, replaced) {
                if (err){
                    callback(err);
                }else{
                    callback(null, replaced);
                }
            });
        }
    });
}

module.exports = DocDBModel;