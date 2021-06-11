// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-integer-indexed-exotic-objects-ownpropertykeys
description: Return keys reflects resized ArrayBuffer
info: |
  9.4.5.6 [[OwnPropertyKeys]] ()

  ...
  3. Let getBufferByteLength be !
     MakeIdempotentArrayBufferByteLengthGetter(SeqCst).
  4. Let len be IntegerIndexedObjectLength(O, getBufferByteLength).
  5. For each integer i starting with 0 such that i < len, in ascending order,
    a. Add ! ToString(i) as the last element of keys.
  ...
includes: [testTypedArray.js, compareArray.js]
features: [Reflect, TypedArray, resizable-arraybuffer]
---*/

var keysByLength = {
  1: "0",
  2: "0,1",
  4: "0,1,2,3",
  8: "0,1,2,3,4,5,6,7",
  16: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15"
};

// If the host chooses to throw as allowed by the specification, the observed
// behavior will be identical to the case where `ArrayBuffer.prototype.resize`
// has not been implemented. The following assertion prevents this test from
// passing in runtimes which have not implemented the method.
assert.sameValue(typeof ArrayBuffer.prototype.resize, "function");

testWithTypedArrayConstructors(function(TA) {
  var ab = new ArrayBuffer(8, {maxByteLength: 16});
  var BPE = TA.BYTES_PER_ELEMENT;
  var array = new TA(ab);
  var caught = false;

  assert.sameValue(
    Reflect.ownKeys(array).join(","),
    keysByLength[8 / BPE],
    "initial"
  );

  try {
    ab.resize(16);
  } catch (_) {
    caught = true;
  }

  if (caught) {
    caught = false;
  } else {
    assert.sameValue(
      Reflect.ownKeys(array).join(","),
      keysByLength[16 / BPE],
      "following grow"
    );
  }

  try {
    ab.resize(8);
  } catch (_) {
    caught = true;
  }

  if (caught) {
    caught = false;
  } else {
    assert.sameValue(
      Reflect.ownKeys(array).join(","),
      keysByLength[8 / BPE],
      "following shrink"
    );
  }
});
