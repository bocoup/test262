// Copyright (C) 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The initial value of Generator.prototype.constructor is the intrinsic
    object %Generator%.
es6id: 25.3.1.1
includes: [propertyHelper.js]
---*/

var GeneratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(function*() {}())
);

assert.sameValue(
  Object.getPrototypeOf(function*() {}).prototype, GeneratorPrototype
);

verifyNotEnumerable(GeneratorPrototype, 'constructor');
verifyNotWritable(GeneratorPrototype, 'constructor');
verifyConfigurable(GeneratorPrototype, 'constructor');
