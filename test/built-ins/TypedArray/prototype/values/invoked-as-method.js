// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.29
description: Requires a [[TypedArrayName]] internal slot.
features: [TypedArray]
includes: [testTypedArray.js]
---*/

var TypedArrayPrototype = TypedArray.prototype;

assert.sameValue(typeof TypedArrayPrototype.values, 'function');

assert.throws(TypeError, function() {
  TypedArrayPrototype.values();
});
