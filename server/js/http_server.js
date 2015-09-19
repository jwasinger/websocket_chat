var express = require('express');
var fs = require('fs');
var bl = require('bl');
var util = require('util');
var path = require('path');
var Q = require('q');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var Session = require('./Session');

var app = express();
module.exports = app;

var settings = require('./settings');
var User = require('./models').User;

//set up logger for customizeable debug output (to console/file/pipe/...)
var log = require('./Logger');
log.Init();
var logger = log.Logger;


//use Nunjucks for HTML templating
nunjucks.configure(path.join(settings.PROJECT_ROOT, 'client/templates'), {
  autoescape: true, 
  express: app
});

//allow files to be served from client static and application shared folders
app.use('/static',express.static(path.join(settings.PROJECT_ROOT, 'client/static')));
app.use('/shared', express.static(path.join(settings.PROJECT_ROOT, 'shared')));

//use body parser to be able to parse out form fields from HTTP POST bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set up session handling with connect-mongo
var session = new Session();
session.Init(app);

var views = require('./views');
app.use(views);

//Begin views...
/*
app.get('/login', function(req, res)
{
  debugger;
  if(req.session.username != undefined)
    res.redirect('/chat');
  else
    res.render('login.html');
});

app.get('/', function(req, res)
{
  res.redirect('/login');
});

app.post('/login', function(req, res)
{

  // TODO: perform authentication and redirect client to error page if it fails
  if(req.body.username == undefined || 
     req.body.password == undefined)
  {
    res.render('login.html', {
      error: 'Please enter a username and password'
    });
  }

  var users = User.find({username: req.body.username, password: req.body.password}).then(function success(data)
  {
    if(data.length == 1)
    {
      req.session.username = data[0].username;
      req.session.user_type = data[0].user_type;
      req.session.address = req.connection.remoteAddress;

      req.session.save(function(error)
      {
        if(error)
        {
          logger.log(error);
          res.sendStatus(500);
        }
        res.redirect('/chat');
      });
    }
    else if(data.length > 1)
    {
      console.log('Duplicate user error for: '+req.body.username);
      res.send(500);
    }
    else
    {
      res.render('login.html', {
        error: 'User doesn\'t exist'
      });
    }
  },
  function(err)
  {
    logger.log('Mongo Error: '+err);
  });
  logger.log('pooooop');
  //TODO: init session for the client
});

app.get('/chat', function(req, res)
{
  console.log(req.session.username);
  if(req.session.username != undefined)
  {
    console.log(req.session);
    res.render('chat.html',{
      username: req.session.username
    });
  }
  else
    res.redirect('/');
});

app.get('/test_chat', function(req, res)
{
  res.render('test_chat.html');
});

app.get('/new_user', function(req, res)
{
  if(req.session.username != undefined)
    res.redirect('/chat');
  else
    res.render('new_user.html');
});

app.post('/new_user', function(req, res)
{
  //create the account and log the user in
  var user = new User({ username: req.body.username, password: req.body.password, user_type: req.body.user_type });
  
  User.UserExists(req.body.username).then(function success(val) 
  {
    res.writeHead(200, {
      'Content-Type': 'application/json' 
    });

    if(!val)
    {
      console.log('new user!');
      user.save();

      res.write(JSON.stringify({
        response_type: 'accept'
      }));
    }
    else
    {
      res.write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'User already exists'
      }));
    }
    res.end();
  },
  function error(err)
  {
    console.log('Query error!');
    res.writeHead(500);
    res.end();
  });

  //req.session.username = 'hello-world';
  //res.redirect('/chat');
});

app.post('/logout', function(req, res)
{
  if(req.session.username != undefined)
  {
    debugger;
    req.session.destroy();
    res.sendStatus(200);
  }
  else
  {
    res.sendStatus(500);
  }
});
*/
