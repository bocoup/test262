// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.5
description: BYTES_PER_ELEMENT property of Int8Array
info: >
    The value of TypedArray.BYTES_PER_ELEMENT is the Number value of the
    Element Size value specified in Table 49 for TypedArray.

    This property has the attributes { [[Writable]]: false, [[Enumerable]]:
    false, [[Configurable]]: false }.
includes: [propertyHelper.js]
features: [TypedArray]
---*/

assert.sameValue(Int8Array.BYTES_PER_ELEMENT, 1);

verifyNotEnumerable(Int8Array, 'BYTES_PER_ELEMENT');
verifyNotWritable(Int8Array, 'BYTES_PER_ELEMENT');
verifyNotConfigurable(Int8Array, 'BYTES_PER_ELEMENT');
