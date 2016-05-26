// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-globaldeclarationinstantiation
es6id: 15.1.8
description: Var binding collision with existing lexical declaration
info: |
  [...]
  6. For each name in varNames, do
     a. If envRec.HasLexicalDeclaration(name) is true, throw a SyntaxError
        exception.
includes: [script.js]
---*/

var test262Var;
let test262Let;
const test262Const = null;
class test262Class {}

$.evalScript('var test262Var;');
$.evalScript('function test262Var() {}');

assert.throws(SyntaxError, function() {
  $.evalScript('var test262Let;');
}, 'var on let');

assert.throws(SyntaxError, function() {
  $.evalScript('var test262Const;');
}, 'var on const');

assert.throws(SyntaxError, function() {
  $.evalScript('var test262Class;');
}, 'var on class');

assert.throws(SyntaxError, function() {
  $.evalScript('function test262Let() {}');
}, 'function on let');

assert.throws(SyntaxError, function() {
  $.evalScript('function test262Const() {}');
}, 'function on const');

assert.throws(SyntaxError, function() {
  $.evalScript('function test262Class() {}');
}, 'function on class');
