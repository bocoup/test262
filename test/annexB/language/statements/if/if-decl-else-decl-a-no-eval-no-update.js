// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.4
esid: sec-functiondeclarations-in-ifstatement-statement-clauses
description: >
    Variable binding value is not updated when evaluation does not occur
info: |
    The semantics of such a synthetic BlockStatement includes the web legacy
    compatibility semantics specified in B.3.3.

    B.3.3.1 Changes to FunctionDeclarationInstantiation

    [...]
    3. When the FunctionDeclaration f is evaluated, perform the following steps
       in place of the FunctionDeclaration Evaluation algorithm provided in
       14.1.21:
       [...]
flags: [noStrict]
---*/

if (false) function f() {} else function _f() {}

// A separate file asserts binding initialization, so this reference is
// "guarded" with the `typeof` operator to limit the semantics under test.
assert.sameValue(typeof f, 'undefined');
