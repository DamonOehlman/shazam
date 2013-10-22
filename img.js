var crel = require('crel');

module.exports = function(url) {
  var el = crel('div');

  // create an image to trigger loading
  var img = crel('img', {
    src: url
  });

  img.addEventListener('load', function() {
    console.log('loaded: ' + url);
  });

  // set the image as the background image for the element
  el.style.backgroundImage = 'url(\'' + url + '\')';

  return el;
}