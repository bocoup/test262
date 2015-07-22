// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.3.3.7
description: >
  Function call define default values to arguments
info: >
  13.3.3.7 Runtime Semantics: KeyedBindingInitialization

  When undefined is passed for environment it indicates that a PutValue
  operation should be used to assign the initialization value. This is the case
  for formal parameter lists of non-strict functions. In that case the formal
  parameter bindings are preinitialized in order to deal with the possibility of
  multiple parameters with the same name.
---*/

var results;

var o = {};

function fn(a = 1, b = null, c = o, d) {
  return [a, b, c, d];
}

results = fn();

assert.sameValue(results[0], 1, 'apply default values #1');
assert.sameValue(results[1], null, 'apply default values #2');
assert.sameValue(results[2], o, 'apply default values #3');

// Ref: https://bugzilla.mozilla.org/show_bug.cgi?id=777060
assert.sameValue(
  results[3], undefined,
  'Parameters without defaults after default parameters defaults to undefined'
);
