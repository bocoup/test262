// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.2.1
description: >
  Undefined parameters doesn't replace default values.
---*/

function fn(a = 1, b = 2, c = 3) {
  return [a, b, c];
}

var results = fn(undefined, 42, undefined);

assert.sameValue(results[0], 1);
assert.sameValue(results[1], 42);
assert.sameValue(results[2], 3);
