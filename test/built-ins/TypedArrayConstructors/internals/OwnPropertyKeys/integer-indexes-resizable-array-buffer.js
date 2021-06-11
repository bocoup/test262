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

// If the host chooses to throw as allowed by the specification, the observed
// behavior will be identical to the case where `ArrayBuffer.prototype.resize`
// has not been implemented. The following assertion prevents this test from
// passing in runtimes which have not implemented the method.
assert.sameValue(typeof ArrayBuffer.prototype.resize, "function");

testWithTypedArrayConstructors(function(TA) {
  var BPE = TA.BYTES_PER_ELEMENT;
  var ab = new ArrayBuffer(BPE * 3, {maxByteLength: BPE * 4});
  var array = new TA(ab);
  var caught = false;

  assert.sameValue(Reflect.ownKeys(array).join(","), "0,1,2", "initial");

  try {
    ab.resize(BPE * 4);
  } catch (_) {
    caught = true;
  }

  if (caught) {
    caught = false;
  } else {
    assert.sameValue(
      Reflect.ownKeys(array).join(","), "0,1,2,3", "following grow"
    );
  }

  try {
    ab.resize(BPE*2);
  } catch (_) {
    caught = true;
  }

  if (caught) {
    caught = false;
  } else {
    assert.sameValue(
      Reflect.ownKeys(array).join(","), "0,1", "following shrink"
    );
  }
});
