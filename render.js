var crel = require('crel');
var Slide = require('shaz/slide');

module.exports = function(opts) {
  return function(content) {
    var slide;

    if (content && content.el) {
      slide = content;
    }

    // handle things that are already a HTMLElement
    if (content instanceof HTMLElement) {
      slide = new Slide(content);
    }

    // handle content rendering
    if (typeof content == 'string' || (content instanceof String)) {
      slide = new Slide(crel('section', content));
    }

    // create a new slide (if required)
    slide = slide || new Slide(content);

    // if we have a function, then call the function with the slide as "this"
    if (typeof content == 'function') {
      content.call(slide);
    }

    return slide;
  };
};
