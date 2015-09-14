var mongoose = require('mongoose');
var Q = require('q');
var settings = require('./settings');

exports.Connect = function()
{
  var deferred = Q.defer();

  mongoose.connection.on('open', function() {
    deferred.resolve();
  });

  mongoose.connection.on('error', function(err)
  {
    deferred.reject(err);
  });
  mongoose.connect("mongodb://localhost/"+settings.DB_NAME);
  return deferred.promise;
}
