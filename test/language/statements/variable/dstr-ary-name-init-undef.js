// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-name-init-undef.case
// - src/dstr-binding/default/var-stmt.template
/*---
description: Destructuring initializer with an undefined value (`var` statement)
es6id: 13.3.2.4
flags: [generated]
info: >
    VariableDeclaration : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let rval be GetValue(rhs).
    3. ReturnIfAbrupt(rval).
    4. Return the result of performing BindingInitialization for
       BindingPattern passing rval and undefined as arguments.

    13.3.3.6 Runtime Semantics: IteratorBindingInitialization
    
    SingleNameBinding : BindingIdentifier Initializeropt
    
    [...]
    6. If Initializer is present and v is undefined, then
       a. Let defaultValue be the result of evaluating Initializer.
       b. Let v be GetValue(defaultValue).
       [...]
    7. If environment is undefined, return PutValue(lhs, v).
    8. Return InitializeReferencedBinding(lhs, v).
---*/

var [x = 23] = [undefined];

assert.sameValue(x, 23);
