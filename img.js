var crel = require('crel');
var extend = require('cog/extend');

module.exports = function(url, opts) {
  var container = crel('div', extend({
    class: 'shazam-image'
  }, opts));

  // create an image to trigger loading
  var img = crel('img', {
    src: url
  });

  img.addEventListener('load', function() {
    container.style['background-image'] = 'url("' + url + '")';
  });

  return container;
};
