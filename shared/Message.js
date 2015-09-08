var Message = function(type, data)
{
  this.Type = type;
  this.Data = data;
}

Message.ServerError = function(data)
{
  return new Message('ServerError', data);
}

Message.UserDisconnected = function(username)
{
  return new Message("Disconnect", {
    'username': username
  });
}

Message.UserConnected = function(username)
{
  return new Message('Connect', username); 
}

Message.UserChat = function(message)
{
  return new Message('UserChat', {
    'message': message
  });
}

Message.UserBroadcastChat = function(username, message)
{
  return new Message('UserBroadcastChat', {
    'message': message, 
    'username': username
  });
}

Message.ServerGreeting = function(current_users, latest_messages)
{
  return new Message('ServerGreeting', {
    'current_users': current_users,
    'latest_messages': latest_messages
  });
}

Message.Validate = function(message_str)
{
  var message = JSON.parse(message_str);
  if(message.Type == 'undefined' || message.Data == 'undefined')
  {
    return false;
  }
  return true;
}

if(typeof module != "undefined")
  module.exports = Message;
