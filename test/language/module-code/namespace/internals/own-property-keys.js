// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-module-namespace-exotic-objects-ownpropertykeys
description: >
    The [[OwnPropertyKeys]] internal method
info: |
    1. Let exports be a copy of the value of O's [[Exports]] internal slot.
    2. Let symbolKeys be ! OrdinaryOwnPropertyKeys(O).
    3. Append all the entries of symbolKeys to the end of exports.
    4. Return exports.
flags: [module]
features: [Reflect, Symbol.iterator, Symbol.toStringTag, let, class]
---*/

import * as ns from './own-property-keys.js';
export var local1;
var local2;
export { local2 as renamed };
export { local1 as indirect } from './own-property-keys.js';

var stringKeys = Object.getOwnPropertyNames(ns);

assert.sameValue(stringKeys.length, 7);
assert.sameValue(stringKeys[0], 'local1');
assert.sameValue(stringKeys[1], 'renamed');
assert.sameValue(stringKeys[2], 'localUninit1');
assert.sameValue(stringKeys[3], 'renamedUninit');
assert.sameValue(stringKeys[4], 'default');
assert.sameValue(stringKeys[5], 'indirect');
assert.sameValue(stringKeys[6], 'indirectUninit');

var symbolKeys = Object.getOwnPropertySymbols(ns);

assert(symbolKeys.length > 1);
assert(symbolKeys.indexOf(Symbol.iterator) > -1);
assert(symbolKeys.indexOf(Symbol.toStringTag) > -1);

var allKeys = Reflect.ownKeys(ns);

assert(allKeys.length > 8);
assert.sameValue(allKeys[0], 'local1');
assert.sameValue(allKeys[1], 'renamed');
assert.sameValue(allKeys[2], 'localUninit1');
assert.sameValue(allKeys[3], 'renamedUninit');
assert.sameValue(allKeys[4], 'default');
assert.sameValue(allKeys[5], 'indirect');
assert.sameValue(allKeys[6], 'indirectUninit');
assert(allKeys.indexOf(Symbol.iterator) > 6);
assert(allKeys.indexOf(Symbol.toStringTag) > 6);

export let localUninit1;
let localUninit2;
export { localUninit2 as renamedUninit };
export { localUninit1 as indirectUninit } from './own-property-keys.js';
export default class {}
