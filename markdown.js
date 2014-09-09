// var marked = require('marked');
var marked = require('marked-ast');
var Slide = require('shaz/slide');
var html = require('shaz/html');
var reSlideBreak = /\n\r?\-{2,}/m;
// var hljs = require('highlight.js');
var reLeadingAndTrailingSpaces = /^\s*(.*)\s*$/m;

// var hljsLangMappings = {
//   js: 'javascript'
// };

/* initialise marked */

// marked.setOptions({
//   highlight: function(code, lang) {
//     lang = hljsLangMappings[lang] || lang;

//     // if this is a known hljs language then highlight
//     if (hljs.getLanguage(lang)) {
//       return hljs.highlight(lang, code).value;
//     }
//     else {
//       return code;
//     }
//   }
// });

var markdown = module.exports = function(md, opts) {
  var ast;
  var slide;

  // if we have multiple slides, split and map
  if (reSlideBreak.test(md)) {
    return md.split(reSlideBreak).map(function(content) {
      return markdown(content, opts);
    });
  }

  // create the new slide
  slide = new Slide();

  // parse the slide
  ast = marked.parse(md.replace(reLeadingAndTrailingSpaces, '$1'));

  // walk the ast and create a slide
  ast.map(require('marked-ast-crel')).forEach(function(el) {
    slide.el.appendChild(el);
  });

  return slide;
};
