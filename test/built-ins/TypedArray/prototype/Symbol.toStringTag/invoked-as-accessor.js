// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.31
description: >
    If O does not have a [[TypedArrayName]] internal slot, return undefined.
features: [TypedArray, Symbol.toStringTag]
includes: [testTypedArray.js]
---*/

var TypedArrayPrototype = TypedArray.prototype;

assert.sameValue(TypedArrayPrototype[Symbol.toStringTag], undefined);
