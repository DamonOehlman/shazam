# shazam

Shazam is a simple code driven presentation system.  It is designed
primarily to make it easier to write a presentation that has demos and
that sort of thing baked in.


[![NPM](https://nodei.co/npm/shazam.png)](https://nodei.co/npm/shazam/)



## How it Works

Under the hood shazam just uses
[bespoke.js](https://github.com/markdalgleish/bespoke.js) and a number
of bespoke plugins.  All it's really doing is dynamically creating the
HTML with the various builder functions before letting bespoke do
it's thing.

## Example Usage

```js
var h = require('hyperscript');
var s = require('shazam');

s({
  title: 'Example Presentation',

  // override the default theme
  theme: require('bespoke-theme-tweakable')(),

  // use bullets and other bespoke addons
  plugins: [
    require('bespoke-bullets')('li, .bullet')
  ],

  // initialise the slides
  slides: [
    require('./intro'),

    // cover a couple of different formats
    s.md(require('./processing-csv.md')),
    s.md(require('./processing-shapefile.md')),

    // cover approaches for getting and how to integrate with
    // various online repositories
    s.md(require('./getting-data.md')),

    s.slide([
    ], { png: 'dat', contain: true }),
    s.md(require('./dat.md')),

    s.slide([
      h('h2', 'using'),
      h('h1', 'DAT')
    ]),
    s.md(require('./dat-usage.md')),

    s.md(require('./leveldb.md')),

    require('./displaying-the-data'),
    require('./examples'),

    s.md(require('./p2p.md')),
    s.md(require('./thanks.md'))
  ]
});

s('Welcome to Shazam', [
  'A simple presentation system',
  'more test',
  s.img('http://farm6.staticflickr.com/5350/7053917095_279527795c_o.jpg'),
  s.img('http://farm4.staticflickr.com/3145/2944068022_19a918b09e_b.jpg'),
]);


```

Then make it go using something like
[beefy](https://github.com/chrisdickinson/beefy):

```
beefy examples/welcome.js
```

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
