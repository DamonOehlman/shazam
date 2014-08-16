/* jshint node: true */
'use strict';

var Gedi = require('gedi');
var inherits = require('inherits');

function Deck() {
  if (! (this instanceof Deck)) {
    return new Deck();
  }

  // call inherited
  Gedi.call(this, {
    slides: [],
    current: -1
  });
}

module.exports = Deck;
var proto = Deck.prototype = new Gedi();

Object.defineProperty(proto, 'slides', {
  get: function() {
    return this.get('[/slides]');
  },

  set: function(value) {
    this.set('[/slides]', value);
  }
});

Object.defineProperty(proto, 'current', {
  get: function() {
    return this.get('[/current]');
  },

  set: function(value) {
    var slideCount = this.slides.length;

    // ensure the value is within range
    value = Math.max(0, Math.min(value, slideCount - 1));

    // update the value
    return this.set('[/current]', value);
  }
});

proto.back = function() {
  this.current -= 1;
};

proto.next = function() {
  this.current += 1;
};

