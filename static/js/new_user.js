$(document).ready(function()
{
  $('#app_container').css('display', 'block');
  $('#user_type_select').prop('multiple', 'multiple');
  $('#user_type_select').chosen({max_selected_options: 1, width: '175px'});
  //$('user_type_select').css('display', 'inline-block');
  $('#new_user_form').submit(function(e)
  {
    //attach user type data to the form before submitting
    var input = $('<input />').attr('type', 'hidden');
    input.attr('name', 'user_type');
    input.attr('value', $('#user_type_select').val());
    $(this).append(input);

    $.ajax({
      url: '/new_user', 
      type: 'post',
      data: $(this).serialize(),
      success: function(data)
      {
        alert(data.response_type);
        if(data.response_type == 'reject')
        {
          $('#submit_response').css('background-color', '#FF4444');
          $('#submit_response').css('color', '#990000');
          $('#submit_response').html('Account with that username already exists');
        }
        else
        {
          $('#submit_response').css('background-color', '#44FF44');
          $('#submit_response').css('color', '#009900');
          $('#submit_response').html('Account created');

          window.location = '/chat_room';
        }
        $('#submit_response').css('display', 'inline-block');
      },
      error: function(xhr, error)
      {
        alert('failure: '+error);
      }
    });
    e.preventDefault();
  });
});
