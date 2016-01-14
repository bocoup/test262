// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.9
description: Requires a [[TypedArrayName]] internal slot.
features: [TypedArray]
includes: [testTypedArray.js]
---*/

var TypedArrayPrototype = TypedArray.prototype;

assert.sameValue(typeof TypedArrayPrototype.filter, 'function');

assert.throws(TypeError, function() {
  TypedArrayPrototype.filter();
});
