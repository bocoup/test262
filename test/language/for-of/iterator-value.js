// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13 S5.d
description: >
    Iteration should continue when the iterator result is not an object.
---*/

var iterable = {};
var i, firstIterResult;

iterable[Symbol.iterator] = function() {
  var finalIterResult = { value: null, done: true };
  var nextIterResult = firstIterResult;

  return {
    next: function() {
      var iterResult = nextIterResult;

      nextIterResult = finalIterResult;

      return iterResult;
    }
  };
};

firstIterResult = 123;
i = 0;
for (var x of iterable) {
  assert.sameValue(x, undefined);
  i++;
}
assert.sameValue(i, 1);

firstIterResult = true;
i = 0;
for (var x of iterable) {
  assert.sameValue(x, undefined);
  i++;
}
assert.sameValue(i, 1);

firstIterResult = false;
i = 0;
for (var x of iterable) {
  assert.sameValue(x, undefined);
  i++;
}
assert.sameValue(i, 1);

firstIterResult = 'string';
i = 0;
for (var x of iterable) {
  assert.sameValue(x, undefined);
  i++;
}
assert.sameValue(i, 1);

firstIterResult = undefined;
i = 0;
for (var x of iterable) {
  assert.sameValue(x, undefined);
  i++;
}
assert.sameValue(i, 1);
