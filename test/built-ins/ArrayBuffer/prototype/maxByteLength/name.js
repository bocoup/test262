// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-get-arraybuffer.prototype.maxbytelength
description: >
  get ArrayBuffer.prototype.maxByteLength

  17 ECMAScript Standard Built-in Objects

  Functions that are specified as get or set accessor functions of built-in
  properties have "get " or "set " prepended to the property name string.

includes: [propertyHelper.js]
features: [resizable-arraybuffer]
---*/

verifyProperty(ArrayBuffer.prototype.maxByteLength, 'name', {
  value: 'maxByteLength',
  enumerable: false,
  writable: false,
  configurable: true
});
