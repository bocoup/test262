// Copyright (C) Copyright 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.5
description: constructor property of Int8Array.prototype
info: >
    The initial value of a TypedArray.prototype.constructor is the
    corresponding %TypedArray% intrinsic object.

    ES6 section 17: Every other data property described in clauses 18 through
    26 and in Annex B.2 has the attributes { [[Writable]]: true,
    [[Enumerable]]: false, [[Configurable]]: true } unless otherwise specified.
includes: [propertyHelper.js]
features: [TypedArray]
---*/

assert.sameValue(Int8Array.prototype.constructor, Int8Array);

verifyNotEnumerable(Int8Array.prototype, 'constructor');
verifyWritable(Int8Array.prototype, 'constructor');
verifyConfigurable(Int8Array.prototype, 'constructor');
