// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.4
esid: sec-functiondeclarations-in-ifstatement-statement-clauses
description: >
    Extension not observed when creation of variable binding would produce an
    early error
info: |
    The semantics of such a synthetic BlockStatement includes the web legacy
    compatibility semantics specified in B.3.3.

    B.3.3.1 Changes to FunctionDeclarationInstantiation

    [...]
    ii. If replacing the FunctionDeclaration f with a VariableStatement that
        has F as a BindingIdentifier would not produce any Early Errors for
        func and F is not an element of BoundNames of argumentsList, then
        [...]
features: [let]
flags: [noStrict]
---*/

let f = 234;

assert.sameValue(f, 234);

if (false) ; else function f() {}

assert.sameValue(f, 234);
