// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-Intl.DisplayNames.prototype.of
description: >
  Property descriptor of Intl.DisplayNames.prototype.of
info: |
  17 ECMAScript Standard Built-in Objects:

  Every other data property described in clauses 18 through 26 and in Annex B.2
  has the attributes { [[Writable]]: true, [[Enumerable]]: false,
  [[Configurable]]: true } unless otherwise specified.
includes: [propertyHelper.js]
features: [Intl.DisplayNames]
---*/

assert.sameValue(
  typeof Intl.DisplayNames.prototype.of,
  "function",
  "`typeof Intl.DisplayNames.prototype.of` is `'function'`"
);

verifyProperty(Intl.DisplayNames.prototype, "of", {
  writable: true,
  enumerable: false,
  configurable: true,
});
