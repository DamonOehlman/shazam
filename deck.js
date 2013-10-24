/* jshint node: true */
'use strict';

var gedi = require('gedi');
var util = require('util');

function Deck() {
  if (! (this instanceof Deck)) {
    return new Deck();
  }

  this.data = gedi({ slides: [], current: -1 });
}

module.exports = Deck;
var proto = Deck.prototype;

proto.next = function() {
  console.log('next');
};