/* jshint node: true */
/* global document: false */
'use strict';

var fs = require('fs');
// var bedazzle = require('bedazzle');
var crel = require('crel');
var insertCss = require('insert-css');
var transform = require('feature/css')('transform');
var flatten = require('whisk/flatten');
var keydown = require('dd/next')('keydown', document);
var pull = require('pull-stream');
var render = require('./render');
var current;
var slide;

// transform functions
var activate = push(0);
var pushRight = push('100%');
var pushLeft = push('-100%');

// create a key directions hash
var keyDirections = {
  37: 'back',
  38: 'back',
  39: 'next',
  40: 'next'
};

insertCss(fs.readFileSync(__dirname + '/css/base.css'));
insertCss(fs.readFileSync(__dirname + '/css/code.css'));

/**
  # shazam

  Shazam is a simple code driven presentation system.

  ## Example Usage

  <<< examples/welcome.js

  Then make it go using something like
  [beefy](https://github.com/chrisdickinson/beefy):

  ```
  beefy examples/welcome.js
  ```

**/

var shazam = module.exports = function(title, opts, deck) {
  var slides = [];
  var slideIdx = 0;
  var autoTitle;

  var keyActions = {
    37: previousSlide,
    38: previousSlide,
    39: nextSlide,
    40: nextSlide
  };

  function nextSlide() {
    if (slideIdx < slides.length - 1) {
      slideIdx += 1;

      slides[slideIdx - 1].emit('leave');
      pushLeft(slides[slideIdx - 1]);
      activate(slides[slideIdx]);
      slides[slideIdx].emit('enter');
    }
  }

  function previousSlide() {
    if (slideIdx > 0) {
      slideIdx -= 1;

      slides[slideIdx + 1].emit('leave');
      pushRight(slides[slideIdx + 1]);
      activate(slides[slideIdx]);
      slides[slideIdx].emit('enter');
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

  // if we are autotitling, then do that now
  autoTitle = (opts || {}).autoTitle == true;
  if (autoTitle) {
    console.log('auto titling');
    deck = [{ title: title }].concat(deck);
  }

  // create the slides
  slides = deck.reduce(flatten)

    // create the slides based in input
    .map(render(opts))
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
    transform(slide.el, 'translateX(' + position + ') translateZ(0)');
    return slide;
  };
}

function append(slide) {
  // add to the document
  document.body.appendChild(slide.el);

  // return the slide
  return slide;
}