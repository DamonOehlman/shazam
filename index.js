/* jshint node: true */
/* global document: false */
'use strict';

var fs = require('fs');
// var bedazzle = require('bedazzle');
var crel = require('crel');
var transform = require('feature/css')('transform');
var flatten = require('whisk/flatten');
var keydown = require('dd/next')('keydown', document);
var pull = require('pull-stream');
var render = require('./render');
var current;
var slide;

// transform functions
var activate = push(0);
var pushRight = push(screen.width);
var pushLeft = push(-screen.width);
var wooble = fs.readFileSync(__dirname + '/examples/test.js');

// create a key directions hash
var keyDirections = {
  37: 'back',
  38: 'back',
  39: 'next',
  40: 'next'
};

require('insert-css')(fs.readFileSync(__dirname + '/css/base.css'));

/**
  # shazam
  
  Shazam is a simple code driven presentation system.

  ## Example Usage

  <<< examples/welcome.js
**/

var shazam = module.exports = function(title, opts, deck) {
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

      pushLeft(slides[slideIdx - 1]);
      activate(slides[slideIdx]);
    }
  }

  function previousSlide() {
    if (slideIdx > 0) {
      slideIdx -= 1;

      pushRight(slides[slideIdx + 1]);
      activate(slides[slideIdx]);
    }
  }

  // if we don't have transforms spit the dummy
  if (! transform) {
    throw new Error('need css transforms');
  }

  // check for no opts
  if (Array.isArray(opts)) {
    deck = opts;
    opts = {};
  }

  // initialise the basepath
  opts.basepath = opts.basepath || '';

  console.log(__dirname);

  // create the slides
  slides = deck.reduce(flatten)
    // create the element
    .map(render(opts))
    // apply required base styling
    .map(style)
    // push right
    .map(pushRight)
    // append to the body
    .map(append);

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
      keyActions[key]();
    })
  );

  // display the initial slide
  if (slides.length > 0) {
    activate(slides[slideIdx]);
  }
};

/* simple inline plugins */

shazam.img = require('./img');
shazam.markdown = shazam.md = require('./markdown');
shazam.html = require('./html');

/* internal functions */

function push(position) {
  return function(slide) {
    transform(slide, 'translateX(' + position + 'px) translateZ(0)');
    return slide;
  };
}

function append(slide) {
  // add to the document
  document.body.appendChild(slide);

  // return the slide
  return slide;
}

function style(slide) {
  slide.style.position = 'absolute';
  slide.style.height = screen.height + 'px';
  slide.style.width = screen.width + 'px';

  return slide;
}