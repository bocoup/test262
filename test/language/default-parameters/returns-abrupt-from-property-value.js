// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 13.3.3.7
description: >
  Return abrupt from a property value as a default argument.
info: >
  13.3.3.7 Runtime Semantics: KeyedBindingInitialization

  ...
  If Initializer is present and v is undefined, then
    a. Let defaultValue be the result of evaluating Initializer.
    b. Let v be GetValue(defaultValue).
    c. ReturnIfAbrupt(v).
  ...

  6.2.3.1 GetValue (V)

  ...
  5. If IsPropertyReference(V), then
    a. If HasPrimitiveBase(V) is true, then
      i. Assert: In this case, base will never be null or undefined.
      ii. Let base be ToObject(base).
    b. Return base.[[Get]](GetReferencedName(V), GetThisValue(V)).

---*/

var obj = {};
Object.defineProperty(obj, 'err', {
  get: function() {
    throw new Test262Error();
  }
});

function fn(a = obj.err) {
  return 42;
}

assert.throws(Test262Error, function() {
  fn();
});
