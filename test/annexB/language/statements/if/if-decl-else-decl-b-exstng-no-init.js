// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.4
esid: sec-functiondeclarations-in-ifstatement-statement-clauses
description: Existing variable binding is not overwritten
info: |
    The semantics of such a synthetic BlockStatement includes the web legacy
    compatibility semantics specified in B.3.3.

    B.3.3.1 Changes to FunctionDeclarationInstantiation

    [...]
    2. If instantiatedVarNames does not contain F, then
       [...]
flags: [noStrict]
---*/

assert.sameValue(f(), 'outer declaration');

if (false) function _f() { return 'inner declaration-a'; }
else function f() { return 'inner declaration-b'; }

function f() {
  return 'outer declaration';
}
