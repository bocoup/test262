// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.26
description: Throws a TypeError exception when invoked as a function
info: >
  22.2.3.26 %TypedArray%.prototype.subarray( [ begin [ , end ] ] )

  1. Let O be the this value.
  2. If Type(O) is not Object, throw a TypeError exception.
  3. If O does not have a [[TypedArrayName]] internal slot, throw a TypeError
  exception.
  ...
features: [TypedArray]
includes: [testTypedArray.js]
---*/

var subarray = TypedArray.prototype.subarray;

assert.sameValue(typeof subarray, 'function');

assert.throws(TypeError, function() {
  subarray();
});
