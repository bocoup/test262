// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    When DestructuringAssignmentTarget is an object literal and the iterable
    emits `null` as the only value, an array with a single `null` element
    should be used as the value of the nested DestructuringAssignment.
es6id: 13.2.3.6
---*/

var value = [null];
var result, x, length;

var [...{ 0: x, length }] = value;

assert.sameValue(result, value);
assert.sameValue(x, null);
assert.sameValue(length, 1);
