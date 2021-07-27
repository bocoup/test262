// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-Intl.DisplayNames.prototype.of
description: >
  Intl.DisplayNames.prototype.of.name is "of".
info: |
  17 ECMAScript Standard Built-in Objects:

  Every built-in Function object, including constructors, that is not
  identified as an anonymous function has a name property whose value is a
  String.

  Unless otherwise specified, the name property of a built-in Function object,
  if it exists, has the attributes { [[Writable]]: false, [[Enumerable]]:
  false, [[Configurable]]: true }.
includes: [propertyHelper.js]
features: [Intl.DisplayNames]
---*/

verifyProperty(Intl.DisplayNames.prototype.of, "name", {
  value: "of",
  writable: false,
  enumerable: false,
  configurable: true,
});
