// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.2.12
description: >
  Provide a mapped `arguments` with simple parameters list on non strict mode.
info: >
  9.2.12 FunctionDeclarationInstantiation(func, argumentsList)

  22. If argumentsObjectNeeded is true, then
    a. If strict is true or if simpleParameterList is false, then
      ...
    b. Else,
      i. NOTE mapped argument object is only provided for non-strict functions
      that don’t have a rest parameter, any parameter default value
      initializers,or any destructured parameters .
      ii. Let ao be CreateMappedArgumentsObject(func, formals, argumentsList,
      env).
    c. ReturnIfAbrupt(ao).
    d. If strict is true, then
      ...
    e. Else,
      i. Let status be envRec.CreateMutableBinding("arguments").
    ...
flags: [noStrict]
---*/

var _a;

function fn(a, b) {
  arguments[0] = 42;
  _a = a;

  b = 43;
  return arguments[1];
}

var result = fn(false, false);

assert.sameValue(result, 43, 'arguments are mapped');
assert.sameValue(_a, 42, 'parameters are bound to `arguments`');
