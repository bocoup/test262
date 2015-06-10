// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    When DestructuringAssignmentTarget is an object literal, it should be
    parsed as a DestructuringAssignmentPattern and evaluated as a destructuring
    assignment.
es6id: 13.2.3.6
---*/

var value = [1, 2, 3];
var result, x;

var [...{ 1: x }] = value;

assert.sameValue(result, value);
assert.sameValue(x, 2);
