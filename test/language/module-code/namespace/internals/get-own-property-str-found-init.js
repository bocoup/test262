// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-module-namespace-exotic-objects-getownproperty-p
description: >
    Behavior of the [[GetOwnProperty]] internal method with a string argument
    describing an initialized binding
info: |
    1. If Type(P) is Symbol, return OrdinaryGetOwnProperty(O, P).
    2. Let exports be the value of O's [[Exports]] internal slot.
    3. If P is not an element of exports, return undefined.
    4. Let value be ? O.[[Get]](P, O).
    5. Return PropertyDescriptor{[[Value]]: value, [[Writable]]: true,
       [[Enumerable]]: true, [[Configurable]]: false }.
flags: [module]
---*/

import * as ns from './get-own-property-str-found-init.js';
export var local = 201;
export { local as indirect } from './get-own-property-str-found-init.js';
export default 302;
var desc;

assert.sameValue(
  Object.prototype.hasOwnProperty.call(ns, 'local'), true
);
desc = Object.getOwnPropertyDescriptor(ns, 'local');
assert.sameValue(desc.value, 201);
assert.sameValue(desc.enumerable, true, 'local enumerable');
assert.sameValue(desc.writable, true, 'local writable');
assert.sameValue(desc.configurable, false, 'local configurable');

assert.sameValue(
  Object.prototype.hasOwnProperty.call(ns, 'indirect'), true
);
desc = Object.getOwnPropertyDescriptor(ns, 'indirect');
assert.sameValue(desc.indirect, 201);
assert.sameValue(desc.enumerable, true, 'indirect enumerable');
assert.sameValue(desc.writable, true, 'indirect writable');
assert.sameValue(desc.configurable, false, 'indirect configurable');

assert.sameValue(
  Object.prototype.hasOwnProperty.call(ns, 'default'), true
);
desc = Object.getOwnPropertyDescriptor(ns, 'default');
assert.sameValue(desc.default, 302);
assert.sameValue(desc.enumerable, true, 'default enumerable');
assert.sameValue(desc.writable, true, 'default writable');
assert.sameValue(desc.configurable, false, 'default configurable');

