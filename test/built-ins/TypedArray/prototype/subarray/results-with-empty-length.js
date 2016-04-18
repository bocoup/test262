// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.subarray
description: Subarray may return a new empty instance
info: >
  22.2.3.27 %TypedArray%.prototype.subarray( begin , end )

  ...
  17. Return ? TypedArraySpeciesCreate(O, argumentsList).
includes: [testTypedArray.js, compareArray.js]
---*/

testWithTypedArrayConstructors(function(TA) {
  var sample = new TA([40, 41, 42, 43]);

  function testRes(result, msg) {
    assert.sameValue(result.length, 0, msg);
    assert.sameValue(
      result.hasOwnProperty(0),
      false,
      msg + " & result.hasOwnProperty(0) === false"
    );

    assert.notSameValue(result, sample, msg + " & new typedArray object");
    assert.sameValue(
      Object.getPrototypeOf(result),
      Object.getPrototypeOf(sample),
      msg + " & prototype"
    );
    assert.sameValue(
      result.constructor, sample.constructor,
      msg + " & constructor"
    );
    assert(result instanceof TA, "instanceof");
    assert(
      compareArray(sample, [40, 41, 42, 43]),
      msg + " & subarray does not change sample"
    );
  }

  testRes(sample.subarray(4), "begin == length");
  testRes(sample.subarray(5), "begin > length");

  testRes(sample.subarray(4, 4), "begin == length, end == length");
  testRes(sample.subarray(5, 4), "begin > length, end == length");

  testRes(sample.subarray(4, 4), "begin == length, end > length");
  testRes(sample.subarray(5, 4), "begin > length, end > length");

  testRes(sample.subarray(0, 0), "begin == 0, end == 0");
  testRes(sample.subarray(-0, -0), "begin == -0, end == -0");
  testRes(sample.subarray(1, 0), "begin > 0, end == 0");
  testRes(sample.subarray(-1, 0), "being < 0, end == 0");

  testRes(sample.subarray(2, 1), "begin > 0, begin < length, begin > end, end > 0");
  testRes(sample.subarray(2, 2), "begin > 0, begin < length, begin == end");

  testRes(sample.subarray(2, -2), "begin > 0, begin < length, end == -2");

  testRes(sample.subarray(-1, -1), "length = 4, begin == -1, end == -1");
  testRes(sample.subarray(-1, -2), "length = 4, begin == -1, end == -2");
  testRes(sample.subarray(-2, -2), "length = 4, begin == -2, end == -2");

  testRes(sample.subarray(0, -4), "begin == 0, end == -length");
  testRes(sample.subarray(-4, -4), "begin == -length, end == -length");
  testRes(sample.subarray(-5, -4), "begin < -length, end == -length");

  testRes(sample.subarray(0, -5), "begin == 0, end < -length");
  testRes(sample.subarray(-4, -5), "begin == -length, end < -length");
  testRes(sample.subarray(-5, -5), "begin < -length, end < -length");
});
