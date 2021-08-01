const hljs = require('highlight.js');
const fs = require('fs');
const bespoke = require('bespoke');
const crel = require('crel');
const render = require('./render');
const qsa = require('fdom/qsa');
const shaz = require('shaz');
const _ = require('underscore');

/**
  # shazam

  Shazam is a simple code driven presentation system.  It is designed
  primarily to make it easier to write a presentation that has demos and
  that sort of thing baked in.

  ## How it Works

  Under the hood shazam just uses
  [bespoke.js](https://github.com/markdalgleish/bespoke.js) and a number
  of bespoke plugins.  All it's really doing is dynamically creating the
  HTML with the various builder functions before letting bespoke do
  it's thing.

  ## Example Usage

  <<< examples/welcome.js

  Then make it go using something like
  [beefy](https://github.com/chrisdickinson/beefy):

  ```
  beefy examples/welcome.js
  ```

**/

const shazam = module.exports = (opts = {}) => {
  const insertCss = require('insert-css');
  const defaultPlugins = [
    require('bespoke-keys')(),
    require('bespoke-touch')(),
    require('bespoke-hash')()
  ];

  // initialise styles
  const styles = [
    fs.readFileSync(__dirname + '/css/shazam.css', 'utf8'),
    fs.readFileSync(__dirname + '/css/code.css', 'utf8'),
    opts.codeTheme || fs.readFileSync(__dirname + '/css/railscasts.css', 'utf8'),
    ...opts.styles || [],
  ];

  const getPluginList = () => ([
    ...defaultPlugins,
    ...(opts.plugins || []),
    opts.theme || require('bespoke-theme-voltaire')(),
  ]);

  let slides = (opts || {}).slides || [];
  let autoTitle;
  let deck;

  function triggerEvent(evtName) {
    return function(evt) {
      var slide = slides[evt.index];
      if (slide && typeof slide.emit == 'function') {
        slide.emit(evtName);
      }
    };
  }

  // initialise the basepath
  opts.basepath = opts.basepath || '';

  // flatten the slides
  rebuildDeck(slides = _.flatten(slides).map(render(opts)));

  // initialise bespoke
  deck = bespoke.from('article', getPluginList());

  ['activate', 'deactivate'].forEach(function(evtName) {
    deck.on(evtName, triggerEvent(evtName));
  });

  // set out title based on the title provided
  document.title = (opts || {}).title || 'Untitled Presentation';

  // insert the required css
  styles.forEach(insertCss);

  // initialise any code fragments
  qsa('pre code').forEach(hljs.highlightBlock.bind(hljs));
};

/* simple inline plugins */

Object.keys(shaz).forEach(function(key) {
  shazam[key] = shaz[key];
});

shazam.blank = shaz.slide;

/* helpers */

function initContainer() {
  let container = document.getElementById('shazam');
  if (!container) {
    container = crel('article', {
      id: 'shazam'
    });

    document.body.appendChild(container);
  }

  return container;
}

function rebuildDeck(slides, current) {
  const container = initContainer();
  qsa('.slide', container).forEach(el => el.parentNode.removeChild(el))
  slides.forEach((slide) => container.appendChild(slide.el))
}
