var express = require('express');
var router = express.Router();
var User = alias.require('models').User;
var logger = alias.require('./Logger').Logger;

router.get('/login', function(req, res)
{
  debugger;
  if(req.session.username != undefined)
    res.redirect('/chat_room');
  else
    res.render('login.html');
});

router.get('/', function(req, res)
{
  res.redirect('/');
});

router.post('/login', function(req, res)
{
  if(req.body.username == undefined || 
     req.body.password == undefined)
  {
    res.status(200).send({
      success: false,
      error: 'no_user_pw'
    });

    return;
  }

  var users = User.find({username: req.body.username, password: req.body.password}).then(function success(data)
  {
    debugger;
    if(data.length == 1)
    {
      //only one matching user account found.
      //create a new session for the user 
      req.session.username = data[0].username;
      req.session.user_type = data[0].user_type;
      req.session.address = req.connection.remoteAddress;

      req.session.save(function(error)
      {
        if(error)
        {
          logger.log(error);
          res.status(500).end();
        }
        else
          res.status(200).send({
            success: true, 
          });
      });
    }
    else if(data.length > 1)
    {
      logger.log('Duplicate user error for: '+req.body.username);
      res.send(500);
    }
    else
    {
      res.status(200).send({
        success: false,
        error: 'auth'
      });
    }
  },
  function(err)
  {
    logger.log('Mongo Error: '+err);
    res.status(500).end();
  });
});

router.get('/chat_room', function(req, res)
{
  debugger;
  if(req.session.username != undefined)
  {
    res.render('chat_room.html',{
      username: req.session.username
    });
  }
  else
    res.redirect('/login');
});

router.get('/new_user', function(req, res)
{
  if(req.session.username != undefined)
    res.redirect('/chat_room');
  else
    res.render('new_user.html');
});

router.post('/new_user', function(req, res)
{
  //create the account and log the user in
  var user = new User({ username: req.body.username, password: req.body.password, user_type: req.body.user_type });
  
  User.find({ username: req.body.username }).then(function success(err, docs) 
  {
    if(err)
    {
      res.write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'Duplicate Users in DB'
      }));
    }
    else
    {
      res.writeHead(200, {
        'Content-Type': 'application/json' 
      });
    }

    if(!docs)
    {
      console.log('new user!');
      user.save();

      res.write(JSON.stringify({
        response_type: 'accept'
      }));
    }
    else if(docs.length == 1)
    {
      res.write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'User already exists'
      }));
    }
    else if(docs.length > 1)
    {
      res.write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'Duplicate Users in DB'
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
});

router.post('/logout', function(req, res)
{
  if(req.session.username != undefined)
  {
    req.session.destroy();
    res.sendStatus(200);
  }
  else
  {
    res.sendStatus(500);
  }
});

module.exports = router;
