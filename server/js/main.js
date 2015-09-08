var Alias = require('require-alias');
global.alias = new Alias({
  aliases: {
    '@shared': '../../shared'
  }
});
alias.require('@shared/Util');

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
  console.log('Connected to DB...');
  var chat_server = new ChatServer(1337);
  chat_server.Init().then(function success()
  {
    http_server.listen(80, function()
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
