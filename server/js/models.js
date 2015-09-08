var mongoose = require('mongoose');
var Q = require('q');

var user_schema = mongoose.Schema({ 
  username: String,
  password: String,
  user_type: String,
});

module.exports.User = mongoose.model('User', user_schema);
