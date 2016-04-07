// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-performeval
es5id: 10.4.2.1-4-s
description: >
    Strict Mode - Strict mode eval code cannot instantiate functions
    in the variable environment of the caller to eval.
---*/

var typeOf;

(function() {
  (0,eval)("'use strict'; function _10_4_2_1_4_fun(){}");
  typeOf = typeof fun;
}());

assert.sameValue(typeOf, "undefined");
assert.sameValue(typeof fun, "undefined");
