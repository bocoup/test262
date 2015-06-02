// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.4.1
description: Invocation when super is not a constructor
info: >
    1. If NewTarget is undefined, throw a TypeError exception.
    2. Let here be the active function.
    3. Let super be here.[[GetPrototypeOf]]().
    4. ReturnIfAbrupt(super).
    5. If IsConstructor (super) is false, throw a TypeError exception.
features: [TypedArray]
---*/

Object.setPrototypeOf(Int8Array, {});

assert.throws(TypeError, function() {
  new Int8Array();
});
