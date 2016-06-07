module.exports = function(ws)
{
  var ClientStatus = {
    Connected: "Connected", //client computer has connected via websocket 
                             //but not identified itself (by sending SessID)

    Identified: "Identified"//Client identified and ready to begin using Chat
  };

  var username = null;
  var user_type = null;
  var ws = ws;
  var sess_id = null;
  var client_id = null;
  var status = ClientStatus.Connected;

  this.HookClientInfo = function(username, user_type)
  {
    __username = username;
    __user_type = user_type;
  }
}
