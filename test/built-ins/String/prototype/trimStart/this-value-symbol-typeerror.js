// Copyright (C) 2017 Valerie Young. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-string.prototype.trimStart
description: Type error when "this" value is a Symbol
info: |
  TrimString
  2. Let S be ? ToString(str).

  ToString
  Argument Type: Symbol
  Result: Throw a TypeError exception
features: [string-trimming]
---*/

var trimStart = String.prototype.trimStart;
var symbol = Symbol();

assert.throws(
  TypeError,
  function() { trimStart.call(symbol); },
  'String.prototype.trimStart.call(Symbol())'
);
