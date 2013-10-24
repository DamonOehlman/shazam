/* jshint node: true */
'use strict';

var gedi = require('gedi');
var util = require('util');

function Deck() {
  console.log(this instanceof Deck);

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

  set: function() {
    return this.data.set('[/current]', value);
  }
});

proto.next = function() {
  console.log('next');
};