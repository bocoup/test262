// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-escape-string
es6id: B.2.1.1
description: Escaping of code units above 255
info: |
    [...]
    5. Repeat, while k < length,
       a. Let char be the code unit (represented as a 16-bit unsigned integer)
          at index k within string.
       [...]
       c. Else if char ≥ 256, then
          i. Let S be a String containing six code units "%uwxyz" where wxyz
             are the code units of the four hexadecimal digits encoding the
             value of char.
       [...]
---*/

assert.sameValue(
  escape('\u0100\u0101\u0102'),
  '%u0100%u0101%u0102',
  '\\u0100\\u0101\\u0102'
);

assert(
  /^%ufffd%ufffe%uffff$/i.test(escape('\ufffd\ufffe\uffff')),
  '\\ufffd\\ufffd\\ufffd'
);

assert(
  /^%ud834%udf06$/i.test(escape('\ud834' + '\udf06')),
  '\\ud834\\udf06 (surrogate pairs)'
);
