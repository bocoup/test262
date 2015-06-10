// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    A sparse ArrayBindingPattern without an BindingElementList requires
    iterable values and throws for other values.
es6id: 12.14.5.2
---*/

var value, result;

assert.throws(TypeError, function() {
  [,] = undefined;
});

assert.throws(TypeError, function() {
  [,] = null;
});

assert.throws(TypeError, function() {
  [,] = true;
});

assert.throws(TypeError, function() {
  [,] = 1;
});

var [,] = 'string literal';

assert.sameValue(result, 'string literal');

assert.throws(TypeError, function() {
  [,] = Symbol('s');
});

value = [];
var [,] = value;

assert.sameValue(result, value);
