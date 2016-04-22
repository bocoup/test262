// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.1.3.16
esid: sec-array.prototype.map
description: Abrupt completion from `@@species` property access
info: |
    [...]
    5. Let A be ? ArraySpeciesCreate(O, len).
    [...]

    9.4.2.3 ArraySpeciesCreate

    [...]
    5. Let C be ? Get(originalArray, "constructor").
    [...]
    7. If Type(C) is Object, then
       a. Let C be ? Get(C, @@species).
features: [Symbol.species]
---*/

var a = [];
var callCount = 0;
var cb = function() { callCount += 1; };
a.constructor = {};

Object.defineProperty(a.constructor, Symbol.species, {
  get: function() {
    throw new Test262Error();
  }
});

assert.throws(Test262Error, function() {
  a.map(cb);
});
assert.sameValue(callCount, 0);
