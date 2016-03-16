// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-name-init-fn-named.case
// - src/dstr-binding/default/let-stmt.template
/*---
description: SingleNameBinding does not re-assign name to named functions (`let` statement)
es6id: 13.3.1.4
flags: [generated]
info: >
    LexicalBinding : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let value be GetValue(rhs).
    3. ReturnIfAbrupt(value).
    4. Let env be the running execution context's LexicalEnvironment.
    5. Return the result of performing BindingInitialization for BindingPattern
       using value and env as the arguments.

    13.3.3.6 Runtime Semantics: IteratorBindingInitialization
    
    SingleNameBinding : BindingIdentifier Initializeropt
    
    [...]
    6. If Initializer is present and v is undefined, then
       a. Let defaultValue be the result of evaluating Initializer.
       b. Let v be GetValue(defaultValue).
       c. ReturnIfAbrupt(v).
       d. If IsAnonymousFunctionDefinition(Initializer) is true, then
          [...]
    7. If environment is undefined, return PutValue(lhs, v).
    8. Return InitializeReferencedBinding(lhs, v).
---*/

let [x = function y() {}] = [];

assert.sameValue(x.name, 'y');
