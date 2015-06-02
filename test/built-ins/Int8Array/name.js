// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.5
description: name property of Int8Array
info: >
    Each TypedArray constructor has a name property whose value is the String
    value of the constructor name specified for it in Table 49.

    ES6 section 17: Unless otherwise specified, the name property of a built-in
    Function object, if it exists, has the attributes { [[Writable]]: false,
    [[Enumerable]]: false, [[Configurable]]: true }.
includes: [propertyHelper.js]
features: [TypedArray]
---*/

assert.sameValue(Int8Array.name, 'Int8Array');

verifyNotEnumerable(Int8Array, 'name');
verifyNotWritable(Int8Array, 'name');
verifyConfigurable(Int8Array, 'name');
