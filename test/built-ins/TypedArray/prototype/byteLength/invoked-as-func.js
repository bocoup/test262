// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.2
description: If Type(O) is not Object, throw a TypeError exception.
features: [TypedArray]
includes: [testTypedArray.js]
---*/

var TypedArrayPrototype = TypedArray.prototype;
var getter = Object.getOwnPropertyDescriptor(
  TypedArrayPrototype, 'byteLength'
).get;

assert.throws(TypeError, function() {
  getter();
});
