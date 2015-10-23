var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var Q = require('q');

var mem_store = null;

module.exports.CreateMemStore = function(express_app)
{
  mem_store = new MongoStore({
    mongooseConnection: mongoose.connection
  });

  express_app.use(session({
    resave: true,
    store: mem_store,
    maxAge: null, 
    saveUninitialized: false,
    secret: 'idontcare',
    cookie: {httpOnly: false},
    unset: 'destroy'
  }));
}

//because session is stored as an encoded JSON object in the DB, 
//need to construct a regex that will match query params in any particular order
module.exports.Query = function(query_params)
{
  var deferred = Q.defer();
  var query = construct_regex_query(query_params);

  mongoose.connection.db.collection('sessions').find(query).toArray(function(error, data)
  {
    if(error != undefined)
    {
      deferred.reject(error);
    }
    else
    {
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}

function construct_regex_query(query_params)
{
  var query_str = '';

  for(var key in query_params)
  {
    //todo support querying complex objects (for now only strings)
    query_str += '.*(?="'+key+'":"'+query_params[key]+'")';
  }
  query_str += '.*';

  var query = {session: new RegExp(query_str)};
  return query;
}
