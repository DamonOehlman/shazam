var crel = require('crel');
var reImg = /\.(jpg|jpeg|png|bmp|gif|svg)$/i;

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

  if (opts && opts.background) {
    this.setBackground(opts.background);

    // set the background size
    this.el.style['background-size'] = (opts || {}).contain ? 'contain': 'cover';
  }

  // flag whether loaded or not
  this.loaded = true;
}

module.exports = Slide;
var proto = Slide.prototype;

proto.bespoke = function(attr, value) {
  this.el.setAttribute('data-bespoke-' + attr, value);
};

proto.setBackground = function(value) {
  if (reImg.test(value)) {
    return this.setBackgroundImage(value);
  }

  this.el.style['background'] = value;
};

proto.setBackgroundImage = function(value) {
  var img = new Image();
  var el = this.el;

  img.onload = function() {
    el.style['background-image'] = 'url("' + value +'")';
  };

  img.src = value;
}
