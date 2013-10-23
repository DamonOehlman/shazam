var marked = require('marked');
var html = require('./html');
var hljs = require('highlight.js');
var hljsLangMappings = {
  js: 'javascript'
};

var reSlideBreak = /\n\r?\-{2,}/m;
var reLeadingAndTrailingSpaces = /^\s*(.*)\s*$/m;

/* initialise marked */

marked.setOptions({
  highlight: function(code, lang) {
    lang = hljsLangMappings[lang] || lang;

    // if this is a known hljs language then highlight
    if (hljs.LANGUAGES[lang]) {
      return hljs.highlight(lang, code).value;
    }
    else {
      return code;
    }
  }
});

var markdown = module.exports = function(md) {
  // if we have multiple slides, split and map
  if (reSlideBreak.test(md)) {
    return md.split(reSlideBreak).map(markdown);
  }

  return html(marked(md.replace(reLeadingAndTrailingSpaces, '$1')));
}