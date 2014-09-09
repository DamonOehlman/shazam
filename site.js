var crel = require('crel');
var Slide = require('shaz/slide');
var reURL = /^\w+\:\/\//;

module.exports = function(site, opts) {
  var slide;
  var url = site;

  if (! reURL.test(url)) {
    url = '//' + url;
  }

  return new Slide([
    crel('a', { href: url }, site)
  ], opts);
};
