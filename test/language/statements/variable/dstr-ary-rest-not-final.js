// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-rest-not-final.case
// - src/dstr-binding/default/var-stmt.template
/*---
description: Rest element followed by an invalid element (`var` statement)
es6id: 13.3.2.4
flags: [generated]
negative: SyntaxError
info: >
    VariableDeclaration : BindingPattern Initializer
    
    1. Let rhs be the result of evaluating Initializer.
    2. Let rval be GetValue(rhs).
    3. ReturnIfAbrupt(rval).
    4. Return the result of performing BindingInitialization for
       BindingPattern passing rval and undefined as arguments.

    13.3.3 Destructuring Binding Patterns
    ArrayBindingPattern[Yield] :
        [ Elisionopt BindingRestElement[?Yield]opt ]
        [ BindingElementList[?Yield] ]
        [ BindingElementList[?Yield] , Elisionopt BindingRestElement[?Yield]opt ]
---*/

var [...x, y] = [1, 2, 3];


