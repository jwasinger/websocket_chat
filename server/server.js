var Alias = require('require-alias');
global.alias = new Alias({
  aliases: {
    '@shared': '../shared'
  }
});

var fs = require('fs');
var express = require('express');
var bl = require('bl');
var util = require('util');
var path = require('path');
var ChatServer = require('./ChatServer');
var settings = require('./settings');
var http_server = require('./http_server');
var db = require('./DB');

db.Connect().then(function success()
{
  console.log('Connected to Mongo DB...');
  var chat_server = new ChatServer(settings.WEBSOCKET_PORT); //chat server trying to create another http server
  chat_server.Init().then(function success()
  {
    http_server.listen(settings.HTTP_PORT, function()
    {
      console.log('server started');
    });
  },
  function error(err)
  {
    console.log("error initiating chat client: "+err);
  });
},
function error(err)
{
  console.log('error trying to connect to MongoDB: {0}'.format(err));
});
