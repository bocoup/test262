// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: AnnexB extension not honored in strict mode (Function declaration in the `case` clause of a `switch` statement in the global scope)
es6id: B.3.3.2
flags: [onlyStrict]
info: >
    B.3.3.3 Changes to EvalDeclarationInstantiation

    1. If strict is false, then
---*/

var err1, err2;

(function() {
  try {
    f;
  } catch (exception) {
    err1 = exception;
  }

  switch (1) {
    case 1:
      function f() {  }
  }

  try {
    f;
  } catch (exception) {
    err2 = exception;
  }
}());

assert.sameValue(err1.constructor, ReferenceError);
assert.sameValue(err2.constructor, ReferenceError);
