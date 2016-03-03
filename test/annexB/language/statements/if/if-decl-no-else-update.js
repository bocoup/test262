// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.4
esid: sec-functiondeclarations-in-ifstatement-statement-clauses
description: Variable binding value is updated to following evaluation
info: |
    The semantics of such a synthetic BlockStatement includes the web legacy
    compatibility semantics specified in B.3.3.

    B.3.3.1 Changes to FunctionDeclarationInstantiation

    [...]
    3. When the FunctionDeclaration f is evaluated, perform the following steps
       in place of the FunctionDeclaration Evaluation algorithm provided in
       14.1.21:
       a. Let fenv be the running execution context's VariableEnvironment.
       b. Let fenvRec be fenv's EnvironmentRecord.
       c. Let benv be the running execution context's LexicalEnvironment.
       d. Let benvRec be benv's EnvironmentRecord.
       e. Let fobj be ! benvRec.GetBindingValue(F, false).
       f. Perform ! fenvRec.SetMutableBinding(F, fobj, false).
       g. Return NormalCompletion(empty). 
flags: [noStrict]
---*/

if (true) function f() {}

assert.sameValue(typeof f, 'function');
