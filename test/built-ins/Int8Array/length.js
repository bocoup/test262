// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.5
description: length property of Int8Array
info: >
    TypedArray has a "length" property whose value is 3.

    ES6 section 17: Unless otherwise specified, the length property of a
    built-in Function object has the attributes { [[Writable]]: false,
    [[Enumerable]]: false, [[Configurable]]: true }.
includes: [propertyHelper.js]
features: [TypedArray]
---*/

assert.sameValue(Int8Array.length, 3);

verifyNotEnumerable(Int8Array, 'length');
verifyNotWritable(Int8Array, 'length');
verifyConfigurable(Int8Array, 'length');
