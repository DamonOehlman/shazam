/* jshint node: true */
'use strict';

var gedi = require('gedi');

function Deck() {
  if (! (this instanceof Deck)) {
    return new Deck();
  }

  this.data = gedi({ slides: [], current: -1 });
}

module.exports = Deck;
var proto = Deck.prototype;

Object.defineProperty(proto, 'slides', {
  get: function() {
    return this.data.get('[/slides]');
  },

  set: function(value) {
    this.data.set('[/slides]', value);
  }
});

Object.defineProperty(proto, 'current', {
  get: function() {
    return this.data.get('[/current]');
  },

  set: function(value) {
    var slideCount = this.slides.length;

    // ensure the value is within range
    value = Math.max(0, Math.min(value, slideCount - 1));

    // update the value
    return this.data.set('[/current]', value);
  }
});

proto.back = function() {
  this.current -= 1;
};

proto.next = function() {
  this.current += 1;
};

