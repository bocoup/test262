// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 7.4.2 S4
description: >
    If Type(result) is not Object, throw a TypeError exception.
---*/

var iterable = {};
var firstIterResult;

iterable[Symbol.iterator] = function() {
  var finalIterResult = { value: null, done: true };
  var nextIterResult = firstIterResult;

  return {
    next: function() {
      var iterResult = nextIterResult;

      nextIterResult = finalIterResult;

      return iterResult;
    }
  };
};

firstIterResult = true;
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = false;
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = 'string';
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = undefined;
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = null;
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = 4;
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = NaN;
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = Symbol('s');
assert.throws(TypeError, function() {
  for (var x of iterable) {}
});

firstIterResult = /regexp/;
for (var x of iterable) {}

firstIterResult = {};
for (var x of iterable) {}
