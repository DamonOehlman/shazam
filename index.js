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
var qsa = require('dd/qsa');
var current;
var slide;

// initialise the deck data (may as well be globally available)
var deck = window.deck = require('./deck')();

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
  var autoTitle;

  var keyActions = {
    37: 'back',
    38: 'back',
    39: 'next',
    40: 'next'
  };

  // when the entire slides change, then update the page
  deck.data.bind('[/slides]', function() {
    rebuildDeck(deck.slides, deck.current);
  });

  deck.data.bind('[/current]', function(changed) {
    location.hash = 's' + changed.getValue();
  });


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
  deck.data.set('[/slides]', slides.reduce(flatten).map(render(opts)));

  // set out title based on the title provided
  document.title = title;

  // handle keys
  pull(
    pull.Source(keydown),
    pull.map(function(evt) {
      console.log(evt.keyCode);
      return keyActions[evt.keyCode];
    }),
    pull.drain(function(action) {
      if (action && typeof deck[action] == 'function') {
        deck[action]();
      }
    })
  );

  // display the initial slide
  if (slides.length > 0) {
    deck.data.set('[/current]', 0);
  }
};

/* simple inline plugins */

shazam.img = require('./img');
shazam.markdown = shazam.md = require('./markdown');
shazam.html = require('./html');

/* helpers */

function rebuildDeck(slides, current) {
  var container = document.getElementById('shazam') || document.body;

  // remove current slides
  qsa('.slide', container).forEach(function(el) {
    el.parentNode.removeChild(el);
  });

  // add the new slides
  slides.forEach(function(slide, idx) {
    // initialise the slide id
    slide.el.id = 's' + idx;

    // add the container
    container.appendChild(slide.el);
  });
}