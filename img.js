var crel = require('crel');
var extend = require('cog/extend');
var Slide = require('./slide');

module.exports = function(url, opts) {
  var slide = new Slide();

  // create an image to trigger loading
  var img = crel('img', {
    src: url
  });

  slide.el.classList.add('shazam-image');

  img.addEventListener('load', function() {
    slide.el.style['background-image'] = 'url("' + url + '")';
  });

  return slide;
};
