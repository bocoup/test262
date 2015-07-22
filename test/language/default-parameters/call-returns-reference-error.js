// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.3.3.7
description: >
  Throws a ReferenceError from a unsolvable reference as the default parameter.
info: >
  13.3.3.7 Runtime Semantics: KeyedBindingInitialization

  ...
  If Initializer is present and v is undefined, then
    a. Let defaultValue be the result of evaluating Initializer.
    b. Let v be GetValue(defaultValue).
    c. ReturnIfAbrupt(v).
  ...

  6.2.3.1 GetValue (V)

  1. ReturnIfAbrupt(V).
  2. If Type(V) is not Reference, return V.
  3. Let base be GetBase(V).
  4. If IsUnresolvableReference(V), throw a ReferenceError exception.
  ...
---*/

function fn(a = unresolvableReference) {
  return 42;
}

assert.throws(ReferenceError, function() {
  fn();
});
