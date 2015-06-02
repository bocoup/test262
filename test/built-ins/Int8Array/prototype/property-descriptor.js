// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.5.2
description: prototype property of Int8Array
info: >
    The initial value of TypedArray.prototype is the corresponding TypedArray
    prototype intrinsic object (22.2.6).

    This property has the attributes { [[Writable]]: false, [[Enumerable]]:
    false, [[Configurable]]: false }.
includes: [propertyHelper.js]
features: [TypedArray]
---*/

verifyNotEnumerable(Int8Array, 'prototype');
verifyNotWritable(Int8Array, 'prototype');
verifyNotConfigurable(Int8Array, 'prototype');
