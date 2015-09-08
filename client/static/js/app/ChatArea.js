define(function()
{
  $.fn.extend({
    ChatArea : function()
    {
      var _this = this;
      _this.scrolled = false; //has the user scrolled to view messages in the chat history
      _this.messages = [];

      $(_this).on('scroll', function()
      {
        if(_this.scrollTop != _this.scrollHeight)
        {
          _this.scrolled = true;
        }
        else
        {
          _this.scrolled = false;
        }
      });

      //throw a new message onto the message output area. 
      //messages are arranged chronologically from bottom to top (overflowing above the container)
      //see twitch.tv chat for an example of how this works
      $(this).data({
        push_message: function(username, message, username_color)
        {
          var msg_elt = $('<span><b>{0}:</b> {1}</span>'.format(username, message));
          msg_elt.find('b').css('color', username_color);

          if(_this.scrolled)
          {
            var prev_scroll_bot = $(_this).scrollHeight - $(_this).scrollTop;
            $(_this).find('div.inner .filler').before(msg_elt);
            $(_this).scrollTop = $(_this).scrollHeight - prev_scroll_bot;
          }
          else
          {
            $(_this).find('div.inner .filler').before(msg_elt);
            $(_this).scrollTop = $(_this).scrollHeight;
          }
          _this.messages.push(msg_elt);
        }
      });
      
      for(var i = 0; i < 20; i++)
      {
        $(this).data('push_message')('Jared', 'Iteration: {0}'.format(i.toString()), 'red');
      }
    }});
});
