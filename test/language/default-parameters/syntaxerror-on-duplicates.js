// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 14.1.2
description: >
  It is a SyntaxError if a a not simple parameters list contains duplicate names
info: >
  FormalParameters : FormalParameterList

  It is a Syntax Error if IsSimpleParameterList of FormalParameterList is false
  and BoundNames of FormalParameterList contains any duplicate elements.
flags: [noStrict]
---*/

function valid1(a, a) {}
var valid2 = function(a,a) {};
(function(a,a) {});

assert.throws(SyntaxError, function() {
  eval("function fn(a, a = 1) {}");
});

assert.throws(SyntaxError, function() {
  eval("var fn = function(a, a = 1) {}");
});

assert.throws(SyntaxError, function() {
  eval("(function(a, a = 1) {})");
});

assert.throws(SyntaxError, function() {
  eval("function fn(a = 0, a = 1, b) {}");
});

assert.throws(SyntaxError, function() {
  eval("var fn = function(a = 0, a = 1, b) {}");
});

assert.throws(SyntaxError, function() {
  eval("(function(a = 0, a = 1, b) {})");
});
