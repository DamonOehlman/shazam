var crel = require('crel');

function Slide() {
  if (! (this instanceof Slide)) {
    return new Slide();
  }

  this.el = crel('div', { class: 'slide' });
}

module.exports = Slide;
var proto = Slide.prototype;

proto.title = function(value) {
  this.el.appendChild(this.title = crel('h1', value));
};

proto.code = function(value) {
  console.log(value);
};