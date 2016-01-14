// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.2.4
description: >
    @@species property of TypedArray
info: >
    %TypedArray%[@@species] is an accessor property whose set accessor function
    is undefined.
features: [TypedArray, Symbol.species]
includes: [testTypedArray.js]
---*/

var desc = Object.getOwnPropertyDescriptor(TypedArray, Symbol.species);

assert.sameValue(desc.set, undefined);
assert.sameValue(typeof desc.get, 'function');
