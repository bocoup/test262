// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-get-arraybuffer.prototype.maxbytelength
description: Throws a TypeError exception when `this` is a SharedArrayBuffer
info: |
  get ArrayBuffer.prototype.maxByteLength

  1. Let O be the this value.
  2. Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
  3. If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
  [...]
features: [SharedArrayBuffer, resizable-arraybuffer]
---*/

var byteLength = Object.getOwnPropertyDescriptor(
  ArrayBuffer.prototype, "maxByteLength"
);

var getter = byteLength.get;
var sab = new SharedArrayBuffer(4);

assert.sameValue(typeof getter, "function");

assert.throws(TypeError, function() {
  getter.call(sab);
}, "`this` cannot be a SharedArrayBuffer");

assert.throws(TypeError, function() {
  Object.defineProperties(sab, { byteLength });
  sab.byteLength;
}, "`this` cannot be a SharedArrayBuffer");
