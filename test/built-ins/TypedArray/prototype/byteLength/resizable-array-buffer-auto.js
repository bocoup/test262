// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-get-%typedarray%.prototype.byteoffset
description: |
  reset to 0 if the underlying ArrayBuffer is resized beyond the boundary of
  the dynamically-sized TypedArray instance
includes: [testTypedArray.js]
features: [TypedArray, resizable-arraybuffer]
---*/

// If the host chooses to throw as allowed by the specification, the observed
// behavior will be identical to the case where `ArrayBuffer.prototype.resize`
// has not been implemented. The following assertion prevents this test from
// passing in runtimes which have not implemented the method.
assert.sameValue(typeof ArrayBuffer.prototype.resize, "function");

testWithTypedArrayConstructors(function(TA) {
  var BPE = TA.BYTES_PER_ELEMENT;
  var ab = new ArrayBuffer(BPE * 4, {maxByteLength: BPE * 5});
  var array = new TA(ab, BPE);
  var expected = BPE * 4;

  assert.sameValue(array.byteLength, expected);

  try {
    ab.resize(BPE * 5);
    expected = BPE * 5;
  } catch (_) {}

  assert.sameValue(array.byteLength, expected, "following grow");

  try {
    ab.resize(BPE * 3);
    expected = BPE * 3;
  } catch (_) {}

  assert.sameValue(array.byteLength, expected, "following shrink (within bounds)");

  try {
    ab.resize(BPE);
    expected = 0;
  } catch (_) {}

  assert.sameValue(array.byteLength, expected, "following shrink (out of bounds)");
});
