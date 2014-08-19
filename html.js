var crel = require('crel');

module.exports = function(html) {
  var el = crel('section', { class: 'slide' });

  // set the inner html
  el.innerHTML = html;
  return el;
};
