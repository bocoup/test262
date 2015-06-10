// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The DestructuringAssignmentTarget of an BindingElement may be a
    PropertyReference.
es6id: 13.2.3.6
---*/

var value = [4];
var x = {};
var result;

var [x.y] = value;

assert.sameValue(result, value);
assert.sameValue(x.y, 4);
