// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-integer-indexed-exotic-objects-hasproperty-p
description: Return false if P's value is not an integer
info: >
  9.4.5.2 [[HasProperty]](P)

  ...
  3. If Type(P) is String, then
    a. Let numericIndex be ! CanonicalNumericIndexString(P).
    b. If numericIndex is not undefined, then
      ...
      iii. If IsInteger(numericIndex) is false, return false.
  ...
features: [Reflect]
includes: [testTypedArray.js]
---*/

testWithTypedArrayConstructors(function(TA) {
  var sample = new TA(1);

  assert.sameValue(Reflect.has(sample, "1.1"), false, "1.1");
  assert.sameValue(Reflect.has(sample, "0.0000000001"), false, "0.0000000001");
});
