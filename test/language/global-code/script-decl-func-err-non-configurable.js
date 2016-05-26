// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-globaldeclarationinstantiation
es6id: 15.1.8
description: >
  Declaration of function when there is no corresponding global property and
  the global object is non-extensible
info: |
  [...]
  9. Let declaredFunctionNames be a new empty List.
  10. For each d in varDeclarations, in reverse list order do
      a. If d is neither a VariableDeclaration or a ForBinding, then
         i. Assert: d is either a FunctionDeclaration or a
            GeneratorDeclaration.
         ii. NOTE If there are multiple FunctionDeclarations for the same name,
             the last declaration is used.
         iii. Let fn be the sole element of the BoundNames of d.
         iv. If fn is not an element of declaredFunctionNames, then
             1. Let fnDefinable be ? envRec.CanDeclareGlobalFunction(fn).
             2. If fnDefinable is false, throw a TypeError exception.

  8.1.1.4.16 CanDeclareGlobalFunction

  [...]
  6. If existingProp.[[Configurable]] is true, return true.
  7. If IsDataDescriptor(existingProp) is true and existingProp has attribute
     values {[[Writable]]: true, [[Enumerable]]: true}, return true.
  8. Return false. 
includes: [script.js]
---*/

Object.preventExtensions(this);

assert.throws(TypeError, function() {
  $.evalScript('function test262() {}');
});
