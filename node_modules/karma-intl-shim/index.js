var path = require('path');
var Intl = require('intl');

var init = function(files) {
  files.unshift({
    pattern: path.join(__dirname, 'lib/shim.js'),
    included: true,
    served: true,
    watched: false
  });
};

init.$inject = ['config.files'];

module.exports = {
  'framework:intl-shim': ['factory', init]
};
