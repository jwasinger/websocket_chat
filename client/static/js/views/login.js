define(['chat/app/ChatClient'], function()
{
  $(document).ready(function()
  {
    $("#app_container").css('display', 'block');
    
    $('#login_btn').on('click', function()
    {
      $('#user_login_form').submit();
    });

    document.onkeydown = function()
    {
      if(window.event.keyCode == '13')
      {
        $('#user_login_form').submit();
      }
    }

    $('#user_login_form').submit(function(e) 
    {
      e.preventDefault();
      if($(this).find('input[name=username]').val() == "" ||
        $(this).find('input[name=password]').val() == "")
      {
        alert('please enter both username and password');
      }
      else
      {
        $.post('/chat/login', $(this).serialize(), function(data)
        {
          if(data.success == false)
          {
            switch(data.error)
            {
              case 'auth':
                alert('user doesn\'t exist');
                break;
              case 'no_user_pw':
                alert('missing username/password');
              default:
                alert('unknown login error: '+error);
                break;
            }
          }
          else
          {
            window.location = '/chat/chat_room';
          }
        }).fail(function()
        {
          alert('user login post failed');
        });
      }

      //clear form fields
      $(this).find('input[name=username]').val('');
      $(this).find('input[name=password]').val('');
    });
  });
});
