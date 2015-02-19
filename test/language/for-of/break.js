// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.6.4.13
description: >
---*/

function* values() {
  yield 3;
  yield 7;
}
var iterable = values();
var i = 0;

for (var x of iterable) {
  assert.sameValue(x, 3);
  i++;
  break;

  assert(false, 'This code is unreachable.');
}

assert.sameValue(i, 1);
