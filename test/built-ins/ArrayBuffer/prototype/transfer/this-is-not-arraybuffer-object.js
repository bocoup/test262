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
  7. NOTE: Reading O.[[ArrayBufferByteLength]] is unobservable if the buffer is
     detached.
  8. Let new be ? Construct(%ArrayBuffer%, « 𝔽(newByteLength) »).
  9. NOTE: This method returns a fixed-length ArrayBuffer.
  10. Let copyLength be min(newByteLength, O.[[ArrayBufferByteLength]]).
  11. Let fromBlock be O.[[ArrayBufferData]].
  12. Let toBlock be new.[[ArrayBufferData]].
  13. Perform CopyDataBlockBytes(toBlock, 0, fromBlock, 0, copyLength).
  14. NOTE: Neither creation of the new Data Block nor copying from the old
      Data Block are observable. Implementations reserve the right to implement
      this method as a zero-copy move or a realloc.
  15. Perform ! DetachArrayBuffer(O).
  16. Return new.
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
