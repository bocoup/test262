// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The DestructuringAssignmentTarget of an BindingElement may be a
    PropertyReference.
es6id: 13.2.3.6
---*/

var value = [4, 3, 2];
var x = {};
var result;

var [...x.y] = value;

assert.sameValue(result, value);
assert.sameValue(x.y.length, 3);
assert.sameValue(x.y[0], 4);
assert.sameValue(x.y[1], 3);
assert.sameValue(x.y[2], 2);
