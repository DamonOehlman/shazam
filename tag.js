var crel = require('crel');
var defaults = require('cog/defaults');
var Slide = require('./slide');

module.exports = function(tagName) {

  function createHash(text) {
    return text.replace(/[\s\:]+/g, '').toLowerCase();
  }

  return function(text, opts) {
    return new Slide(crel(tagName, text), defaults({}, opts, {
      hash: createHash(text)
    }));
  };
};
