# shazam

Shazam is a simple code driven presentation system.


[![NPM](https://nodei.co/npm/shazam.png)](https://nodei.co/npm/shazam/)


## Example Usage

```js
var s = require('shazam');

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

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

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
