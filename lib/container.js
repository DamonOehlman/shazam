const crel = require('crel');

exports.initContainer = (id = 'shazam') => {
  let container = document.getElementById(id);
  if (!container) {
    container = crel('article', {
      id,
    });

    document.body.appendChild(container);
  }

  return container;
};
