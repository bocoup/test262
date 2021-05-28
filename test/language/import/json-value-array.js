// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-parse-json-module
description: Correctly parses the JSON representation of an array
info: |
  # 1.4 ParseJSONModule ( source )

  The abstract operation ParseJSONModule takes a single argument source which
  is a String representing the contents of a module.

  1. Let json be ? Call(%JSON.parse%, undefined, « source »).
  2. Return CreateDefaultExportSyntheticModule(json).
flags: [module]
features: [json-modules]
---*/

import value from './json-value-array_FIXTURE.js' assert { type: 'json' };

assert.sameValue(Object.getPrototypeOf(value), Array.prototype);
assert.sameValue(Object.getOwnPropertyNames(value).length, 7);
assert.sameValue(value.length, 6);

assert.sameValue(value[0], -1.2345);
assert.sameValue(value[1], true);
assert.sameValue(value[2], 'a string value');
assert.sameValue(value[3], null);

assert.sameValue(Object.getPrototypeOf(value[4]), Object.prototype);
assert.sameValue(Object.getOwnPropertyNames(value[4]).length, 0);

assert.sameValue(Object.getPrototypeOf(value[5]), Array.prototype);
assert.sameValue(Object.getOwnPropertyNames(value[5]).length, 1);
