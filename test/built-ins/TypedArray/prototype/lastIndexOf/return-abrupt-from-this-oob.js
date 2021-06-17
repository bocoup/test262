// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-%typedarray%.prototype.lastindexof
description: Return abrupt when "this" value fails buffer boundary checks
includes: [testTypedArray.js]
features: [TypedArray, TypedArray.prototype.at, resizable-arraybuffer]
---*/

assert.sameValue(
  typeof TypedArray.prototype.lastIndexOf,
  'function',
  'implements TypedArray.prototype.lastIndexOf'
);

assert.sameValue(
  typeof ArrayBuffer.prototype.resize,
  'function',
  'implements ArrayBuffer.prototype.resize'
);

testWithTypedArrayConstructors(TA => {
  var BPE = TA.BYTES_PER_ELEMENT;
  var ab = new ArrayBuffer(BPE * 4, {maxByteLength: BPE * 4});
  var array = new TA(ab, 0, 4);

  try {
    ab.resize(BPE * 3);
  } catch (_) {
    // The host is permitted to fail any "resize" operation at its own
    // discretion. If that occurs, the semantics that this test is designed to
    // verify cannot be observed, so bail out.
    return;
  }

  assert.throws(TypeError, () => {
    array.lastIndexOf(0);
  });
});
