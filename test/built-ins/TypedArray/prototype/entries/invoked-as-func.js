// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 22.2.3.6
description: If Type(O) is not Object, throw a TypeError exception.
features: [TypedArray]
includes: [testTypedArray.js]
---*/

var entries = TypedArray.prototype.entries;

assert.sameValue(typeof entries, 'function');

assert.throws(TypeError, function() {
  entries();
});
