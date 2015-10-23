// the main entry point for all javascript
requirejs.config({
  baseUrl: '/static/js/lib',
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
    app: '../app',
    views: '../views',
    bootstrap: 'bootstrap.min',
    shared: '/shared',
  },
  shim:{
    'q': {
      exports: 'Q'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'chosen.jquery': {
      deps: [ 'jquery' ],
      exports: 'jQuery.fn.chosen'
    },
    'shared/Message': {
      exports: 'Message'
    },
    'shared/Util': {
      exports: 'Util'
    }
  }
});

requirejs(['jquery', 'nunjucks', 'q', 'chosen.jquery', 'bootstrap', 'shared/Util'], function($, nunjucks, Q)
{
  var path_strs = window.location.pathname.split('/');
  
  //strip any empty values out of the array
  path_strs = path_strs.filter(function(val)
  {
    return val != "";
  });
  
  switch(path_strs[0])
  {
    case 'chat_room':
      requirejs(['views/chat_room']);
      break;
    case 'login':
      requirejs(['views/login']);
      break;
    case 'new_user': 
      requirejs(['views/new_user']);
      break;
  }
});
