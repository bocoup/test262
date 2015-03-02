// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13
description: >
---*/

var iterable = {};
iterable[Symbol.iterator] = function() {
  var j = 0;
  return {
    next: function() {
      j = j + 2;
      return { value: j, done: j === 8 };
    }
  }
};
var expected = [2, 4, 6];
var i = 0;

for (var x of iterable) {
  assert.sameValue(x, expected[i]);
  i++;
}

assert.sameValue(i, 3);
