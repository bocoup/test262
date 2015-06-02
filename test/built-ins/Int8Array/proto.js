// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.5
description: >
    [[Prototype]] internal slot
info: >
    The value of the [[Prototype]] internal slot of each TypedArray constructor
    is the %TypedArray% intrinsic object (22.2.1).
features: [TypedArray]
---*/

var TypedArray = Object.getPrototypeOf(Int16Array);

assert.sameValue(Object.getPrototypeOf(Int8Array), TypedArray);
