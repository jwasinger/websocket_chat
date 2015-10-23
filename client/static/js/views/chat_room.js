define(['app/ChatClient'], function(ChatClient)
{
  var chat_client = new ChatClient();
  //INIT code:
  //1) make sure that the client has necessary browswer capabilities
  //2) open a connection to the server
  chat_client.Connect('{% Username %}').then(function succ(val)
  {
    /*
    chat_client.OnServerGreeting = function(data)
    {
      data.current_users.forEach(function(user)
      {

      });

      data.latest_messages.forEach(function(message)
      {

      });
    }
    */

    //Hook connection events to DOM elements (the chat_area and user_sidebar)
    chat_client.OnUserMessage = function(data)
    {
      $('#chat_area').data('push_message')(data.username, data.message, 'red');
    }

    /*
    chat_client.OnConnectionClosed = function()
    {
      
    }
    */

    chat_client.OnInternalError = function()
    {}

    chat_client.OnNewUser = function(data)
    {
      $('#user_sidebar').data('push_user')(data, 'red');
    }
    
    chat_client.OnUserLeave = function(data)
    {
      $('#user_sidebar').data('remove_user')(data.username);
    }

    chat_client.OnInvalidMessage = function(err)
    {

    }
  }, 
  function fail(val)
  {
    //display some kind of error message in the main container
  });

  $('#user_sidebar').ChatSidebar();
  $('#chat_area').ChatArea();
  $('#logout_btn').on('click', function()
  {
    $.post('/logout', function(data)
    {
      window.location = '/';
    });
  });

  $('#chat_send').on('click', function()
  {
    var message_text = $('#chat_input').val();
    $('#chat_input').val(null); //clear the input 
    chat_client.SendMessage(message_text);
  });
});
