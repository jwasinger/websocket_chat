function ChatClient()
{
  var ws = null;
  var _this = this;
  this.succ_msg = "Connection successful!";
  
  function __call_callback(callback, args)
  {
    if (typeof callback == 'function')
    {
      return callback(args);
    }
  }

  function __get_sid()
  {
    //sauce: developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent('connect.sid').replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  }
  
  function validate_message_format(message)
  {
    if (typeof(message.Type) != 'string' || messsage.Data == 'undefined')
      return false;
    else
      return true;
  }
  
  function validate_user_status(status_change)
  {
    
  }

  this.Connect = function(username)
  {
   var deferred = Q.defer();
    
    ws = new WebSocket('ws://'+Settings.HOST+':'+Settings.WS_PORT.toString());
    ws.onopen = function()
    {
      ws.onclose = function(e)
      {
        __call_callback(_this.OnConnectionClosed, JSON.parse(e.data));
      };
      ws.onmessage = function(e)
      {
        if(Message.Validate(e.data))
        {
          var message_obj = JSON.parse(e.data);
          switch(message_obj.Type)
          {
            case 'ServerError': 
              __call_callback(_this.OnServerError, message_obj.Data);
              break;
            case 'ServerGreeting':
              __call_callback(_this.OnServerGreeting, message_obj.Data);
              break;
            case 'Disconnect':
              __call_callback(_this.OnUserLeave, message_obj.Data);
              break;
            case 'Connect':
              __call_callback(_this.OnNewUser, message_obj.Data);
              break;
            case 'UserBroadcastChat':
              __call_callback(_this.OnUserMessage, message_obj.Data);
              break;
            case 'ServerGreeting': 

              break;
          }
        }
        else
          __call_callback(_this.OnInvalidMessage, message_obj.data);
      };
      
      deferred.resolve();
    };
    ws.onerror = function(e)
    {
      deferred.reject(e);
    };

    return deferred.promise;
  }

  _this.SendMessage = function(message)
  {
    ws.send(JSON.stringify(Message.UserChat(message)));
  }

  _this.OnUserMessage = null;
  _this.OnInternalError = null;
  _this.OnNewUser = null;
  _this.OnUserLeave = null;
  _this.OnInvalidMessage = null;
  _this.OnConnectionClosed = null;
  _this.OnServerGreeting = null;
};
