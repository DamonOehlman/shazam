/* jshint node: true */
/* global document: false */
'use strict';

var fs = require('fs');
var bespoke = require('bespoke');
var crel = require('crel');
var flatten = require('whisk/flatten');
var render = require('./render');
var qsa = require('fdom/qsa');
var current;
var slide;

/**
  # shazam

  Shazam is a simple code driven presentation system.  It is designed
  primarily to make it easier to write a presentation that has demos and
  that sort of thing baked in.

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
  var deck;

  function getPluginList() {
    return [
      require('bespoke-keys')(),
      require('bespoke-touch')()
    ].concat((opts || {}).theme || require('bespoke-theme-voltaire')());
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
    slides = [{ title: title }].concat(slides);
  }

  rebuildDeck(slides.reduce(flatten).map(render(opts)));

  // initialise bespoke
  deck = bespoke.from('article', getPluginList());

  // set out title based on the title provided
  document.title = title;
};

/* simple inline plugins */

shazam.img = require('./img');
shazam.markdown = shazam.md = require('./markdown');
shazam.html = require('./html');

/* helpers */

function initContainer() {
  var container = document.getElementById('shazam');

  if (! container) {
    container = crel('article', {
      id: 'shazam'
    });

    document.body.appendChild(container);
  }

  return container;
}

function rebuildDeck(slides, current) {
  var container = initContainer();

  // remove current slides
  qsa('.slide', container).forEach(function(el) {
    el.parentNode.removeChild(el);
  });

  // add the new slides
  slides.forEach(function(slide, idx) {
    // add the container
    container.appendChild(slide.el);
  });
}
