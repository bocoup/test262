// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.2.1
description: >
  Return abrupt from argument value.
info: >
  9.2.1 [[Call]] ( thisArgument, argumentsList)

  ...
  7. Let result be OrdinaryCallEvaluateBody(F, argumentsList).
  ...

  9.2.1.3 OrdinaryCallEvaluateBody ( F, argumentsList )

  1. Let status be FunctionDeclarationInstantiation(F, argumentsList).
  2. ReturnIfAbrupt(status)
  ...
---*/

var result;

function fn(a = foo) {
  return 42;
}

assert.throws(ReferenceError, function() {
  fn();
});
