// This file was procedurally generated from the following sources:
// - src/annex-b-fns/eval-global-skip-early-err-for.case
// - src/annex-b-fns/eval-global/indirect-block.template
/*---
description: Extension not observed when creation of variable binding would produce an early error (for statement) (Block statement in eval code containing a function declaration)
esid: sec-web-compat-evaldeclarationinstantiation
es6id: B.3.3.3
flags: [generated, noStrict]
info: |
    B.3.3.2 Changes to GlobalDeclarationInstantiation

    [...]
    b. If replacing the FunctionDeclaration f with a VariableStatement that has
       F as a BindingIdentifier would not produce any Early Errors for script,
       then
    [...]
---*/
assert.throws(ReferenceError, function() {
  f;
}, 'An initialized binding is not created prior to evaluation');
assert.sameValue(
  typeof f,
  'undefined',
  'An uninitialized binding is not created prior to evaluation'
);

(0,eval)(
  'for (let f; ; ) {{ function f() {  } }break;\
  }'
);

assert.throws(ReferenceError, function() {
  f;
}, 'An initialized binding is not created following evaluation');
assert.sameValue(
  typeof f,
  'undefined',
  'An uninitialized binding is not created following evaluation'
);
