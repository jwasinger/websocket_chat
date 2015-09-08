define(function()
{
  $.fn.extend({
    ChatSidebar : function()
    {
      var _this = this;
      
      //get the correct DOM element that username should be inserted 
      //after to preserve alpha-numeric sorting of username list
      function get_AN_location(username, elts)
      {
        for(var i = 0; i < elts.length-1; i++)
        {
          if(elts[i].text() <= username && elts[i+1].text() >= username)
          {
            return elts[i];
          }
        }
      }

      $(this).data({
        push_user: function(username, user_color)
        {
          var users = $(_this).find('span');
          var new_span = $('<span>'+username+'</span>');
          new_span.css('color', user_color);

          if(users.length != 0)
          {
            var where = get_AN_location(username, $(_this).find('span'));
            where.after(new_span);
          }
          else
          {
            $(_this).append(new_span);
          }
          
        },
        remove_user: function(username)
        {
          var user_elt = $(_this).find('span').filter(function()
          {
            $(this).text() == username;
          });

          if(user_elt != undefined)
          {
            user_elt.remove();
            return true;
          }
          else
            return false;
        }
      });
    }
  });
});
