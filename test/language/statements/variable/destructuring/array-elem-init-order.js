// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    Initializer values should be assigned in left-to-right order.
es6id: 13.2.3.6
---*/

var x = 0;

var [ a = x += 1, b = x *= 2 ] = [];

assert.sameValue(a, 1);
assert.sameValue(b, 2);
assert.sameValue(x, 2);
