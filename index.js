/* jshint node: true */
/* global document: false */
'use strict';

var crel = require('crel');
var next = require('dd/next');
var pull = require('pull-stream');

/**
  # shazam

**/

module.exports = function(title, opts, slides) {
  var past = [];
  var queued = [];
  var current;

  function nextSlide() {
    return current = past[past.length] = queued.shift();
  }

  function previousSlide() {
    queued.unshift(current = past.pop());

    return current;
  }

  // check for no opts
  if (Array.isArray(opts)) {
    slides = opts;
    opts = {};
  }

  // copy the deck so we don't destroy it
  queued = [].concat(slides);

  // set out title based on the title provided
  document.title = title;

  pull(
    pull.Source(next('keydown', document)),
    pull.log()
  );

  // render the first slide
  render(nextSlide());
};

function render(content) {
  console.log(content);
}