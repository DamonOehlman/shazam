var crel = require('crel');
var Slide = require('./slide');

module.exports = function(html, opts) {
  var slide = new Slide(null, opts);

  slide.el.innerHTML = html;

  return slide;
};
