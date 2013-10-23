var crel = require('crel');
var Slide = require('./slide');

module.exports = function(opts) {
  return function(content) {
    var slide;

    // handle things that are already a HTMLElement
    if (content instanceof HTMLElement) {
      slide = new Slide(content);
    }

    // handle content rendering
    if (typeof content == 'string' || (content instanceof String)) {
      slide = new Slide(crel('div', content));
    }

    // create a new slide (if required)
    slide = slide || new Slide();

    // if we have a function, then call the function with the slide as "this"
    if (typeof content == 'function') {
      content.call(slide);
    }
    // if we have an object, then iterate through the keys and call
    // relevant slide functions
    else if (typeof content == 'object') {
      Object.keys(content).forEach(function(key) {
        if (typeof slide[key] == 'function') {
          slide[key](content[key]);
        }
      });
    }

    return slide;
  };
};