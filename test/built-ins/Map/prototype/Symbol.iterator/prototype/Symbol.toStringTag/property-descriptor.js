// Copyright (C) 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
  description: >
      `Object.prototype.getOwnPropertyDescriptor` should reflect the value and
      writability of the @@toStringTag attribute.
  includes: [propertyHelper.js]
  es6id: 23.1.3.13
 ---*/

var SetIteratorProto = Object.getPrototypeOf(new Map()[Symbol.iterator]());

assert.sameValue('Map Iterator', SetIteratorProto[Symbol.toStringTag]);

verifyNotEnumerable(SetIteratorProto, Symbol.toStringTag);
verifyNotWritable(SetIteratorProto, Symbol.toStringTag);
verifyConfigurable(SetIteratorProto, Symbol.toStringTag);
