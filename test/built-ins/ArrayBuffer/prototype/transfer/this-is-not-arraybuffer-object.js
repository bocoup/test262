// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-arraybuffer.prototype.transfer
description: >
  Throws a TypeError if `this` does not have an [[ArrayBufferData]] internal slot.
info: |
  ArrayBuffer.prototype.transfer ( [ newLength ] )

  1. Let O be the this value.
  2. Perform ? RequireInternalSlot(O, [[ArrayBufferMaxByteLength]]).
  3. If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
  4. If IsDetachedBuffer(O) is true, throw a TypeError exception.
  5. If newLength is undefined, let newByteLength be
     O.[[ArrayBufferByteLength]].
  6. Else, let newByteLength be ? ToIntegerOrInfinity(newLength).
  7. Let new be ? Construct(%ArrayBuffer%, « 𝔽(newByteLength) »).
  8. NOTE: This method returns a fixed-length ArrayBuffer.
  9. Let copyLength be min(newByteLength, O.[[ArrayBufferByteLength]]).
  10. Let fromBlock be O.[[ArrayBufferData]].
  11. Let toBlock be new.[[ArrayBufferData]].
  12. Perform CopyDataBlockBytes(toBlock, 0, fromBlock, 0, copyLength).
  13. NOTE: Neither creation of the new Data Block nor copying from the old
      Data Block are observable. Implementations reserve the right to implement
      this method as a zero-copy move or a realloc.
  14. Perform ! DetachArrayBuffer(O).
  15. Return new.
includes: [detachArrayBuffer.js]
features: [resizable-arraybuffer]
---*/

assert.sameValue(typeof ArrayBuffer.prototype.transfer, 'function');

assert.throws(TypeError, function() {
  ArrayBuffer.prototype.transfer();
}, '`this` value is the ArrayBuffer prototype');

assert.throws(TypeError, function() {
  ArrayBuffer.prototype.transfer.call({});
}, '`this` value is an object');

assert.throws(TypeError, function() {
  ArrayBuffer.prototype.transfer.call([]);
}, '`this` value is an array');
