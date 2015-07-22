// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.2.1
description: >
  Expressions as parameter default values share the top level context only.
---*/

var x = 42;

function fn1(a = x) {
  return a;
}

assert.sameValue(fn1(), x);

function fn2(a = y) {
  var y = 1;
}

// y is only defined on the inner scope of fn2
assert.throws(ReferenceError, function() {
  fn2();
});

function fn3(a = function() { return typeof z === 'undefined'; }) {
  var z = 1;

  return a();
}

assert(fn3());
