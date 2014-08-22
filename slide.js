var crel = require('crel');
var reImg = /\.(jpg|jpeg|png|bmp|gif|svg)$/i;

var imageAttributes = [
  'jpg', 'jpeg', 'png', 'bmp', 'gif', 'svg'
];

var allowedStyleOverrides = [
  'color'
];

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

  // check for any image attributes
  imageAttributes.forEach(function(key) {
    if (opts && opts[key] && (! opts.background)) {
     opts.background = 'images/' + opts[key] + '.' + key;
    }
  });

  if (opts && opts.background) {
    this.setBackground(opts.background);

    // set the background size
    this.el.style.backgroundSize = (opts || {}).contain ? 'contain': 'cover';
  }

  // apply any style overrides
  this.applyStyleOverrides(opts);

  // flag whether loaded or not
  this.loaded = true;
}

module.exports = Slide;
var proto = Slide.prototype;

proto.applyStyleOverrides = function(opts) {
  var slide = this;

  allowedStyleOverrides.forEach(function(key) {
    if (opts && opts[key]) {
      slide.el.style[key] = opts[key];
    }
  });
};

proto.bespoke = function(attr, value) {
  this.el.setAttribute('data-bespoke-' + attr, value);
};

proto.setBackground = function(value) {
  if (reImg.test(value)) {
    return this.setBackgroundImage(value);
  }

  this.el.style.background = value;
};

proto.setBackgroundImage = function(value) {
  var img = new Image();
  var el = this.el;

  img.onload = function() {
    el.style.backgroundImage = 'url("' + value +'")';
  };

  img.src = value;
}
