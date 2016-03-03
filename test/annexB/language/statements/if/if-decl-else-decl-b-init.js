// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.4
esid: sec-functiondeclarations-in-ifstatement-statement-clauses
description: Variable binding is initialized to `undefined` in outer scope
info: |
    The semantics of such a synthetic BlockStatement includes the web legacy
    compatibility semantics specified in B.3.3.

    B.3.3.1 Changes to FunctionDeclarationInstantiation

    [...]
    2. If instantiatedVarNames does not contain F, then
       a. Perform ! varEnvRec.CreateMutableBinding(F, false).
       b. Perform varEnvRec.InitializeBinding(F, undefined).
       c. Append F to instantiatedVarNames.
flags: [noStrict]
---*/

assert.sameValue(f, undefined, 'binding is initialized to `undefined`');

f = 123;

assert.sameValue(f, 123, 'binding is mutable');

// Ensure the new binding is not block-scoped
{
  if (false) function _f() {} else function f() {}
}
