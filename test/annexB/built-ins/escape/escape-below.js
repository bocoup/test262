// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-escape-string
es6id: B.2.1.1
description: Escaping of code units below 255
info: |
    [...]
    5. Repeat, while k < length,
       a. Let char be the code unit (represented as a 16-bit unsigned integer)
          at index k within string.
       [...]
       d. Else char < 256,
          i. Let S be a String containing three code units "%xy" where xy are
             the code units of two hexadecimal digits encoding the value of
             char.
       [...]
---*/

assert.sameValue(
  escape('\x00\x01\x02\x03'),
  '%00%01%02%03',
  'characters: \\x00\\x01\\x02\\x03'
);

assert.sameValue(
  escape('!"#$%&\'()'),
  '%21%22%23%24%25%26%27%28%29',
  'characters preceeding "*": !"#$%&\'()'
);

assert(/^%2c$/i.test(escape(',')), 'character between "+" and "-": ,');

assert(
  /^%3a%3b%3c%3d%3e%3f$/i.test(escape(':;<=>?')),
  'characters between "9" and "@": :;<=>?'
);

assert(
  /^%5b%5c%5d%5e$/i.test(escape('[\\]^')),
  'characters between "Z" and "_": [\\]^'
);

assert.sameValue(escape('`'), '%60', 'character between "_" and "a": `');

assert(
  /^%7b%7c%7d%7e%7f%80$/i.test(escape('{|}~\x7f\x80')),
  'characters following "z": {|}~\\x7f\\x80'
);

assert(
  /^%fd%fe%ff$/i.test(escape('\xfd\xfe\xff')), '\\xfd\\xfe\\xff'
);
