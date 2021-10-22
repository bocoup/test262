// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-array.prototype.findlastindex
description: Instance buffer can be resized during iteration
includes: [testTypedArray.js, compareArray.js]
features: [TypedArray, resizable-arraybuffer]
---*/

testWithTypedArrayConstructors(function(TA) {
  var BPE = TA.BYTES_PER_ELEMENT;
  var buffer = new ArrayBuffer(BPE * 3, {maxByteLength: BPE * 3});
  var sample = new TA(buffer);
  var elements, indices, arrays, result;

  elements = [];
  indices = [];
  arrays = [];
  result = sample.findLastIndex(function(element, index, array) {
    if (elements.length === 0) {
      buffer.resize(BPE);
    }

    elements.push(element);
    indices.push(index);
    arrays.push(array);
    return false;
  });

  assert.compareArray(elements, [0, undefined, 0], 'elements (shrink)');
  assert.compareArray(indices, [2, 1, 0], 'indices (shrink)');
  assert.compareArray(arrays, [sample, sample, sample], 'arrays (shrink)');
  assert.sameValue(result, -1, 'result (shrink)');

  elements = [];
  indices = [];
  arrays = [];
  result = sample.findLastIndex(function(element, index, array) {
    if (elements.length === 0) {
      buffer.resize(2 * BPE);
    }

    elements.push(element);
    indices.push(index);
    arrays.push(array);
    return false;
  });

  assert.compareArray(elements, [0], 'elements (grow)');
  assert.compareArray(indices, [0], 'indices (grow)');
  assert.compareArray(arrays, [sample], 'arrays (grow)');
  assert.sameValue(result, -1, 'result (grow)');
});
