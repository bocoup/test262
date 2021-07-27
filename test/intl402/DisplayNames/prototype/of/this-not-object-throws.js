// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-Intl.DisplayNames.prototype.of
description: Throws a TypeError if this is not Object.
info: |
  Intl.DisplayNames.prototype.of ()

  1. Let displayNames be this value.
  2. Perform ? RequireInternalSlot(displayNames, [[InitializedDisplayNames]]).
  ...
features: [Intl.DisplayNames, Symbol]
---*/

var of = Intl.DisplayNames.prototype.of;

assert.throws(TypeError, function() {
  of();
}, 'direct call');

assert.throws(TypeError, function() {
  of.call('en');
}, 'string');

assert.throws(TypeError, function() {
  of.call(1);
}, 'number');

assert.throws(TypeError, function() {
  of.call(null);
}, 'null');

assert.throws(TypeError, function() {
  of.call(true);
}, 'true');

assert.throws(TypeError, function() {
  of.call(false);
}, 'false');

var symbol = Symbol();
assert.throws(TypeError, function() {
  of.call(symbol);
}, 'symbol');
