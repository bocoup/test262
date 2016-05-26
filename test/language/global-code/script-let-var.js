// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-globaldeclarationinstantiation
es6id: 15.1.8
description: Let binding collision with existing var declaration
info: |
  [...]
  5. For each name in lexNames, do
     a. If envRec.HasVarDeclaration(name) is true, throw a SyntaxError
        exception.
includes: [script.js]
---*/

var test262Var;
function test262Fn() {}

assert.throws(SyntaxError, function() {
  $.evalScript('let test262Var;');
}, 'variable');

assert.throws(SyntaxError, function() {
  $.evalScript('let test262Fn;');
}, 'function');
