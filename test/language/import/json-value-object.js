// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-parse-json-module
description: Correctly parses the JSON representation of an ordinary object
info: |
  # 1.4 ParseJSONModule ( source )

  The abstract operation ParseJSONModule takes a single argument source which
  is a String representing the contents of a module.

  1. Let json be ? Call(%JSON.parse%, undefined, « source »).
  2. Return CreateDefaultExportSyntheticModule(json).
flags: [module]
includes: [propertyHelper.js]
features: [json-modules]
---*/

import value from './json-value-object_FIXTURE.js' assert { type: 'json' };

assert.sameValue(Object.getPrototypeOf(value), Object.prototype);
assert.sameValue(Object.getOwnPropertyNames(value).length, 6);

verifyProperty(value, 'number', {
  value: -1.2345,
  writable: true,
  enumerable: true,
  configurable: true
});

verifyProperty(value, 'boolean', {
  value: true,
  writable: true,
  enumerable: true,
  configurable: true
});

verifyProperty(value, 'string', {
  value: 'a string value',
  writable: true,
  enumerable: true,
  configurable: true
});

verifyProperty(value, 'null', {
  value: null,
  writable: true,
  enumerable: true,
  configurable: true
});

assert.sameValue(Object.getPrototypeOf(value.object), Object.prototype);
assert.sameValue(Object.getOwnPropertyNames(value.object).length, 0);

assert.sameValue(Object.getPrototypeOf(value.array), Array.prototype);
assert.sameValue(Object.getOwnPropertyNames(value.array).length, 1);
