/* jshint node: true */
/* global document: false */
'use strict';

var fs = require('fs');
var gedi = require('gedi');
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

var shazam = module.exports = function(title, opts, slides) {
  var deck = require('./deck')();
  var autoTitle;

  var keyActions = {
    37: 'back',
    38: 'back',
    39: 'next',
    40: 'next'
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
    slides = opts;
    opts = {};
  }

  // initialise the basepath
  opts.basepath = opts.basepath || '';

  // if we are autotitling, then do that now
  autoTitle = (opts || {}).autoTitle;
  if (autoTitle == true || autoTitle == undefined) {
    console.log('auto titling');
    slides = [{ title: title }].concat(slides);
  }

  // initialise the slides
  deck.data.set('slides', slides.reduce(flatten).map(render(opts)));

  // set out title based on the title provided
  document.title = title;

  // handle keys
  pull(
    pull.Source(keydown),
    pull.map(function(evt) {
      console.log(evt.keyCode);
      return keyActions[evt.keyCode];
    }),
    pull.filter(Boolean),
    pull.drain(function(action) {
      if (typeof model[action] == 'function') {
        model[action]();
      }
    })
  );

  // display the initial slide
  if (slides.length > 0) {
    deck.data.set('current', 0);
  }
};

/* simple inline plugins */

shazam.img = require('./img');
shazam.markdown = shazam.md = require('./markdown');
shazam.html = require('./html');

/* internal functions */

function invokeAction(action) {

}

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