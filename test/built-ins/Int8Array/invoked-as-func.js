// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.4.1
description: If NewTarget is undefined, throw a TypeError exception.
features: [TypedArray]
---*/

assert.sameValue(typeof Int8Array, 'function');

assert.throws(TypeError, function() {
  Int8Array();
});
