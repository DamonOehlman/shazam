var crel = require('crel');

module.exports = function(opts) {
  return function(content) {
    // handle things that are already a HTMLElement
    if (content instanceof HTMLElement) {
      // ensure the content has the class of slide
      content.classList.add('slide');

      // return the content
      return content;
    }

    // handle content rendering
    if (typeof content == 'string' || (content instanceof String)) {
      return crel('div', { class: 'slide' }, content);
    }
  };
};