var express = require('express');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

var router = new express.Router();

router.get("/message/word_frequency", function(req, res) {
  client.search({
    "index": 'message_index',
    "type": 'message_type',
    "body" : {
      "query": {
        "match_all": {}
      },
      "aggs": {
        "message_type": {
          "terms": {"field": "Content"}
        }
      }
    }
  }).then(function(response) {
    res.json(response.aggregations.message_type.buckets);
  }, function(err) {
    debugger;
  });

  debugger;
});

router.put("/message", function(req, res) {
  //TODO
});

module.exports = router;
