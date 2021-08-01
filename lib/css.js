const fs = require('fs');
const path = require('path');
const insertCss = require('insert-css');

exports.importStyles = (
  styles = [],
  codeTheme = fs.readFileSync(path.resolve(__dirname, '../css/railscasts.css'), 'utf8'),
) => {
  [
    fs.readFileSync(path.resolve(__dirname, '../css/shazam.css'), 'utf8'),
    fs.readFileSync(path.resolve(__dirname, '../css/code.css'), 'utf8'),
    codeTheme,
    ...styles,
  ].forEach(insertCss);
};
