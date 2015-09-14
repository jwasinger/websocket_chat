var winston = require('winston');

module.exports = new (function()
{
  this.Init = function()
  {
    this.Logger = new winston.Logger()
  }

  this.Logger = null;
})();
