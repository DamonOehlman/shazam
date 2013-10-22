/* jshint node: true */
'use strict';

/**
  # shazam

**/

module.exports = function(title, opts, slides) {
  // check for no opts
  if (Array.isArray(opts)) {
    slides = opts;
    opts = {};
  }
};