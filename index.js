const hljs = require('highlight.js');
const bespoke = require('bespoke');
const qsa = require('fdom/qsa');
const shaz = require('shaz');
const _ = require('underscore');
const { render } = require('./lib/render');
const { importStyles } = require('./lib/css');
const { initContainer } = require('./lib/container');

const DEFAULT_PLUGIN_PACKAGES = [require('bespoke-keys'), require('bespoke-touch'), require('bespoke-hash')];

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

const shazam = (opts = {}) => {
  const defaultPlugins = DEFAULT_PLUGIN_PACKAGES.map((plugin) => plugin());
  const slides = _.flatten(opts.slides || []).map(render(opts));

  const getPluginList = () => [
    ...defaultPlugins,
    ...(opts.plugins || []),
    opts.theme || require('bespoke-theme-voltaire')(),
  ];

  const triggerEvent = (evtName) => (evt) => {
    const slide = slides[evt.index];
    if (slide && typeof slide.emit === 'function') {
      slide.emit(evtName);
    }
  };

  const container = initContainer();
  qsa('.slide', container).forEach((el) => el.parentNode.removeChild(el));
  slides.forEach((slide) => container.appendChild(slide.el));

  // initialise bespoke
  const deck = bespoke.from('article', getPluginList());

  ['activate', 'deactivate'].forEach((evtName) => {
    deck.on(evtName, triggerEvent(evtName));
  });

  // set out title based on the title provided
  document.title = (opts || {}).title || 'Untitled Presentation';
  importStyles(opts.styles, opts.codeTheme);
  qsa('pre code').forEach(hljs.highlightBlock.bind(hljs));
};

// monkey patch any of the shaz plugins onto shazam
Object.keys(shaz).forEach((key) => {
  shazam[key] = shaz[key];
});

shazam.blank = shaz.slide;

module.exports = shazam;
