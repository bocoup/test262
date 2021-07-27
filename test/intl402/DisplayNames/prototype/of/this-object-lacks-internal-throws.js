// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-Intl.DisplayNames.prototype.of
description: >
  Throws a TypeError if this does not have an [[InitializedDisplayNames]] internal slot.
info: |
  Intl.DisplayNames.prototype.of ()

  1. Let displayNames be this value.
  2. Perform ? RequireInternalSlot(displayNames, [[InitializedDisplayNames]]).
  ...
features: [Intl.DisplayNames]
---*/

var of = Intl.DisplayNames.prototype.of;

assert.throws(TypeError, function() {
  Intl.DisplayNames.prototype.of();
}, 'Intl.DisplayNames.prototype does not have the internal slot');

assert.throws(TypeError, function() {
  of.call({});
}, 'ordinary object');

assert.throws(TypeError, function() {
  of.call(Intl.DisplayNames);
}, 'Intl.DisplayNames does not have the internal slot');

assert.throws(TypeError, function() {
  of.call(Intl);
}, 'Intl does not have the internal slot');

// Not DisplayNames!!!
var dtf = new Intl.DateTimeFormat();

assert.throws(TypeError, function() {
  of.call(dtf);
}, 'of cannot be used with instances from different Intl ctors');
