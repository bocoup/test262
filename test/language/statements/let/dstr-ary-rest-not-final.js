// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-rest-not-final.case
// - src/dstr-binding/default/let-stmt.template
/*---
description: Rest element followed by an invalid element (`let` statement)
es6id: 13.3.1.4
flags: [generated]
negative: SyntaxError
info: >
    LexicalBinding : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let value be GetValue(rhs).
    3. ReturnIfAbrupt(value).
    4. Let env be the running execution context's LexicalEnvironment.
    5. Return the result of performing BindingInitialization for BindingPattern
       using value and env as the arguments.

    13.3.3 Destructuring Binding Patterns
    ArrayBindingPattern[Yield] :
        [ Elisionopt BindingRestElement[?Yield]opt ]
        [ BindingElementList[?Yield] ]
        [ BindingElementList[?Yield] , Elisionopt BindingRestElement[?Yield]opt ]
---*/

let [...x, y] = [1, 2, 3];


