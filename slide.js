var EventEmitter = require('events').EventEmitter;
var util = require('util');
var crel = require('crel');

function Slide(el) {
  if (! (this instanceof Slide)) {
    return new Slide(el);
  }

  // assign or create the element
  this.el = el || crel('div');

  // flag whether loaded or not
  this.loaded = true;

  // prepare the element
  this._prep(this.el);

  var slide = this;
  setTimeout(function() {
    slide.loaded = false;
  }, 1000);
}

util.inherits(Slide, EventEmitter);

module.exports = Slide;
var proto = Slide.prototype;

proto.title = function(value) {
  this.el.appendChild(this.title = crel('h1', value));
};

proto.code = function(value) {
  console.log(value);
};

/* internal methods */

proto._prep = function(el) {
  // add the slide class
  el.classList.add('slide');
};