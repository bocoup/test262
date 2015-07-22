// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.2.1
description: >
  Function call define default values to arguments
info: >
  9.2.1 [[Call]] ( thisArgument, argumentsList)

  ...
  7. Let result be OrdinaryCallEvaluateBody(F, argumentsList).
  ...

  9.2.1.3 OrdinaryCallEvaluateBody ( F, argumentsList )

  1. Let status be FunctionDeclarationInstantiation(F, argumentsList).
  2. ReturnIfAbrupt(status)
  ...

  9.2.12 FunctionDeclarationInstantiation(func, argumentsList)

  ...
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
