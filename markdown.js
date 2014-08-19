var marked = require('marked');
var html = require('./html');
var reSlideBreak = /\n\r?\-{2,}/m;
var reLeadingAndTrailingSpaces = /^\s*(.*)\s*$/m;

/* initialise marked */

marked.setOptions({
  highlight: function(code, lang) {
    return code;
  }
});

var markdown = module.exports = function(md) {
  // if we have multiple slides, split and map
  if (reSlideBreak.test(md)) {
    return md.split(reSlideBreak).map(markdown);
  }

  return html(marked(md.replace(reLeadingAndTrailingSpaces, '$1')));
};
