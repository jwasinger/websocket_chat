//init common stuff here...
var cur_page = null;

var path_elts = window.location.pathname.split('/');
for(var i = 0; i < path_elts.length; i++)
{
  if(path_elts[i] == 'chat')
  {
    if(path_elts[i+1] != undefined)
    {
      cur_page = path_elts[i+1];
    }
  }
}

switch(cur_page)
{
  case 'chat_room':
    requirejs(['chat/views/chat_room']);
    break;
  case 'new_user':
    requirejs(['chat/views/new_user']);
    break;
  case 'login':
  case '':
    requirejs(['chat/views/login']);
    break;
}
