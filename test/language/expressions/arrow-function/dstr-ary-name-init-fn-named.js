// This file was procedurally generated from the following sources:
// - src/dstr-binding/ary-name-init-fn-named.case
// - src/dstr-binding/default/arrow-function.template
/*---
description: SingleNameBinding does not re-assign name to named functions (arrow function expression)
es6id: 14.2.16
flags: [generated]
info: >
    ArrowFunction : ArrowParameters => ConciseBody
    
    [...]
    4. Let closure be FunctionCreate(Arrow, parameters, ConciseBody, scope, strict).
    [...]
    
    9.2.1 [[Call]] ( thisArgument, argumentsList)
    
    [...]
    7. Let result be OrdinaryCallEvaluateBody(F, argumentsList).
    [...]
    
    9.2.1.3 OrdinaryCallEvaluateBody ( F, argumentsList )
    
    1. Let status be FunctionDeclarationInstantiation(F, argumentsList).
    [...]
    
    9.2.12 FunctionDeclarationInstantiation(func, argumentsList)
    
    [...]
    23. Let iteratorRecord be Record {[[iterator]]:
        CreateListIterator(argumentsList), [[done]]: false}.
    24. If hasDuplicates is true, then
        [...]
    25. Else,
        b. Let formalStatus be IteratorBindingInitialization for formals with
           iteratorRecord and env as arguments.
    [...]

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

var callCount = 0;
var f;
f = ([x = function y() {}]) => {
  assert.sameValue(x.name, 'y');
  callCount = callCount + 1;
};

f([]);
assert.sameValue(callCount, 1);
