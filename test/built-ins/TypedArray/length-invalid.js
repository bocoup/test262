// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.1.2
description: TypedArray rejects non-integer arguments
info: >
    If SameValueZero(numberLength, elementLength) is false, throw a RangeError
    exception.
features: [TypedArray]
includes: [testTypedArray.js]
---*/

assert.throws(RangeError, function() {
  new TypedArray(1.1);
});
