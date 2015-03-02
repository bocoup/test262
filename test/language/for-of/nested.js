// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13
description: >
    Nested statements should operate independently.
---*/

function* values() {
  yield 3;
  yield 7;
}

var iterable1 = values();
var expected = [3, 7];
var i = 0;
var iterable2, j;

for (var x of iterable1) {
  assert.sameValue(x, expected[i]);
  iterable2 = values();
  j = 0;
  for (var y of iterable2) {
    assert.sameValue(y, expected[j]);
    j++;
  }
  assert.sameValue(j, 2);
  i++;
}

assert.sameValue(i, 2);
