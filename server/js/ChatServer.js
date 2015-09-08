var Client = require('./Client');
var ws = require('ws');
var _ = require('underscore');
var Q = require('q');
var mongoose = require('mongoose');

var Logger = alias.require('@site/Logger').Logger;
var Session = alias.require('@site/Session');
var Message = alias.require('@chat_shared/Message');

function ConnectedClient(name, socket)
{
  this.username = name;
  this.ws = socket;
}

module.exports = function(port)
{
  var __this = this;
  var ws_server = new ws.Server({port:port});
  var __client_counter = 0;
  var __connected_clients = []; // an array of web socket connections
  var __current_users = [];
  var __chat_history = [];
  
  this.Init = function()
  {
    var deferred = Q.defer();
    //delete all entries from UserSession collection
    if(mongoose.connection.collections['usersessions'] != undefined)
    {
      mongoose.connection.collections['usersessions'].drop( function(err)
      {
        console.log('dropped!');
        if(err != 'MongoError: ns not found')
          deferred.resolve();
        else
          deferred.resolve();
      });
    }
    else
    {
      deferred.resolve();
    }

    return deferred.promise;
  }

  ws_server.on('connection', function connect(ws)
  {
    __this.OnNewConnection(ws);
    ws.on('message', function message(data)
    {
      __this.OnMessage(ws, data);
      console.log('received: %s', data);
    });
    ws.on('close', function close(data)
    {
      __this.OnConnectionClosed(ws, data);
      console.log('cxn closed');
    });

    console.log('new cxn');

    //ws.send('new connection');
  });

  this.OnNewConnection = function(ws)
  {
    //get the user associated with the websocket's address
    Session.Query({address:ws._socket.remoteAddress}).then(
    function(data)
    {
      if(data.length > 1)
      {
        logger.log("ERROR: DUPLICATE SESSIONS");
      }
      else
      {
        var session_obj = JSON.parse(data[0].session);
        __connected_clients.push(new ConnectedClient(session_obj.username, ws));
        __broadcast_message_all(ws, Message.UserConnected(session_obj.username));

        //send the newly connected client a list of other users and recent chat history (20 messages)
        var cur_users = [];
        __connected_clients.forEach(function(client)
        {
          cur_users.push(client.username);
        });
        ws.send(JSON.Stringify(Message.ServerGreeting(cur_users, __chat_history)));
      }
    },
    function(error)
    {
      debugger;
    });
  }

  this.OnConnectionClosed = function(ws, data)
  {
    //find the client and send a message to all users that they have disconnected before
    //removing them from the __connected_clients list
    __connected_clients.filter(function(client)
    {
      if(client.ws == ws)
      {
        __broadcast_message(ws, Message.UserDisconnected(client.username));
        return false;
      }
      else 
        return true;
    });
  }

  this.OnMessage = function(ws, data)
  {
    debugger;
    if(Message.Validate(data))
    {
      var message_obj = JSON.parse(data);
      switch(message_obj.Type)
      {
        case 'UserChat':
          Session.Query({address:ws._socket.remoteAddress}).then(
          function(data)
          {
            debugger;
            if(data.length > 1)
            {
              logger.log('LENGTH GREATER THAN ONE');
              return;
            }

            var session_obj = JSON.parse(data[0].session);

            if(__chat_history.length >= 20)
              __chat_history.pop();
            __chat_history.unshift({'Username': session_obj.username, 'Message': message_obj.Data['message']});

            __broadcast_message_all(ws, Message.UserBroadcastChat(session_obj.username, message_obj.Data['message']));
          },
          function(err)
          {
            logger.log('DB error: '+err);
          });
          break;
        default:
          logger.log('Unrecognized message type: '+message_obj.Type);
          break;
      }
    }
  }

  //broadcast a message from a user to all other users
  //from is a websocket instance
  function __broadcast_message(from, message)
  {
    for(var i = 0; i < __connected_clients.length; i++)
    {
      if(!__connected_clients[i].ws.__socket)
        continue;
      else if(__connected_clients[i].ws._socket.remoteAddress != from.remoteAddress)
      {
        __connected_clients[i].ws.send(message);
      }
    }
  }

  function __broadcast_message_all(from, message)
  {
    for(var i = 0; i < __connected_clients.length; i++)
    {
      if(!__connected_clients[i].ws._socket)
      {
        continue;
      }
      else
      {
        debugger;
        __connected_clients[i].ws.send(JSON.stringify(message));
      }
    }
  }
}
