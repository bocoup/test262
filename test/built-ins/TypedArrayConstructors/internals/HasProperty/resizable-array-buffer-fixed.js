// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-integer-indexed-exotic-objects-hasproperty-p
description: returned keys reflect resized ArrayBuffer for a fixed-sized TypedArray
includes: [testTypedArray.js]
features: [Reflect, TypedArray, resizable-arraybuffer]
---*/

// If the host chooses to throw as allowed by the specification, the observed
// behavior will be identical to the case where `ArrayBuffer.prototype.resize`
// has not been implemented. The following assertion prevents this test from
// passing in runtimes which have not implemented the method.
assert.sameValue(typeof ArrayBuffer.prototype.resize, "function");

testWithTypedArrayConstructors(function(TA) {
  var BPE = TA.BYTES_PER_ELEMENT;
  var ab = new ArrayBuffer(BPE * 4, {maxByteLength: BPE * 5});
  var array = new TA(ab, BPE, 2);
  var resizeFailed;

  assert.sameValue(
    [Reflect.has(array, 1), Reflect.has(array, 2)].join(","),
    "true,false",
    "initial"
  );

  resizeFailed = false;
  try {
    ab.resize(BPE * 5);
  } catch (_) {
    resizeFailed = true;
  }

  if (!resizeFailed) {
    assert.sameValue(
      [Reflect.has(array, 1), Reflect.has(array, 2)].join(","),
      "true,false",
      "following grow"
    );
  }

  resizeFailed = false;
  try {
    ab.resize(BPE*3);
  } catch (_) {
    resizeFailed = true;
  }

  if (!resizeFailed) {
    assert.sameValue(
      [Reflect.has(array, 1), Reflect.has(array, 2)].join(","),
      "true,false",
      "following shrink (within bounds)"
    );
  }

  resizeFailed = false;
  try {
    ab.resize(BPE*2);
  } catch (_) {
    resizeFailed = true;
  }

  if (!resizeFailed) {
    assert.sameValue(
      Reflect.has(array, 0),
      false,
      "following shrink (out of bounds)"
    );
  }
});
