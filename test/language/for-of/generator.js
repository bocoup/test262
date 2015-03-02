// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13
description: >
---*/

function* values() {
  yield 2;
  yield 4;
  yield 8;
}
var iterable = values();
var expected = [2, 4, 8];
var i = 0;

for (var x of iterable) {
  assert.sameValue(x, expected[i]);
  i++;
}

assert.sameValue(i, 3);
