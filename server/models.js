var mongoose = require('mongoose');
var Q = require('q');

var user_schema = mongoose.Schema({ 
  username: String,
  password: String,
  user_type: String,
});

var MessageSchema = mongoose.Schema({
  username: String,
  content: String,
  timestamp: String
});

module.exports.User = mongoose.model('User', user_schema);
module.exports.Message = mongoose.model('Message', MessageSchema);
