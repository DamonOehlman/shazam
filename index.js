/* jshint node: true */
/* global document: false */
'use strict';

var body = document.body;
var crel = require('crel');
var keydown = require('dd/next')('keydown', document);
var pull = require('pull-stream');
var current;
var slide;

// create a key directions hash
var keyDirections = {
  37: 'back',
  38: 'back',
  39: 'next',
  40: 'next'
};

/**
  # shazam

**/

module.exports = function(title, opts, deck) {
  var slides = [];
  var slideIdx = 0;

  var keyActions = {
    37: previousSlide,
    38: previousSlide,
    39: nextSlide,
    40: nextSlide
  };

  function nextSlide() {
    if (slideIdx < slides.length - 1) {
      slideIdx += 1;
    }

    return slides[slideIdx];
  }

  function previousSlide() {
    if (slideIdx > 0) {
      slideIdx -= 1;
    }

    return slides[slideIdx];
  }

  // check for no opts
  if (Array.isArray(opts)) {
    deck = opts;
    opts = {};
  }

  // copy the deck so we don't destroy it
  slides = [].concat(deck);
  slideIdx = 0;

  // set out title based on the title provided
  document.title = title;

  // handle keys
  pull(
    pull.Source(keydown),
    pull.map(function(evt) {
      return evt.keyCode;
    }),
    pull.filter(function(key) {
      return keyActions[key];
    }),
    pull.drain(function(key) {
      render(keyActions[key](), keyDirections[key])
    })
  );

  // render the first slide
  render(slides[slideIdx]);
};

function render(content, direction) {
  if (current === content) {
    return;
  }

  // if we have a current slide, then remove it from the DOM
  if (slide) {
    slide.parentNode.removeChild(slide);
    slide = null;
  }

  // handle content rendering
  if (typeof content == 'string' || (content instanceof String)) {
    slide = crel('div', { class: 'slide' }, content);
    body.appendChild(slide);
  }

  // update current
  current = content;
}