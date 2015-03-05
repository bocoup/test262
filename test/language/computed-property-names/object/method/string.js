// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    computed property method names can be a string
includes: [compareArray.js]
---*/

function ID(x) {
  return x;
}

var object = {
  a() { return 'A'},
  ['b']() { return 'B'; },
  c() { return 'C'; },
  [ID('d')]() { return 'D'; },
};
assert.sameValue(object.a(), 'A', "`object.a()` returns `'A'`");
assert.sameValue(object.b(), 'B', "`object.b()` returns `'B'`");
assert.sameValue(object.c(), 'C', "`object.c()` returns `'C'`");
assert.sameValue(object.d(), 'D', "`object.d()` returns `'D'`");
assert(
  compareArray(Object.keys(object), ['a', 'b', 'c', 'd']),
  "`compareArray(Object.keys(object), ['a', 'b', 'c', 'd'])` returns `true`"
);
