var crel = require('crel');

function Slide(el, opts) {
  if (! (this instanceof Slide)) {
    return new Slide(el);
  }

  // assign or create the element
  this.el = crel('section', el);

  // if we have a hash, then set it
  if (opts && opts.hash) {
//     this.bespoke('hash', opts.hash);
  }

  // flag whether loaded or not
  this.loaded = true;
}

module.exports = Slide;
var proto = Slide.prototype;

proto.bespoke = function(attr, value) {
  this.el.setAttribute('data-bespoke-' + attr, value);
};
