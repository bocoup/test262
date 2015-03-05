// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    In a class, static computed property method names can be a symbol
includes: [compareArray.js]
---*/
var sym1 = Symbol();
var sym2 = Symbol();
class C {
  static a() { return 'A'; }
  static [sym1]() { return 'B'; }
  static c() { return 'C'; }
  static [sym2]() { return 'D'; }
}
assert.sameValue(C.a(), 'A');
assert.sameValue(C[sym1](), 'B');
assert.sameValue(C.c(), 'C');
assert.sameValue(C[sym2](), 'D');
assert(compareArray(Object.keys(C), []));
assert(compareArray(Object.getOwnPropertyNames(C), ['length', 'name', 'prototype', 'a', 'c']));


// compareArray expects arguments to be sorted,
// which will cause an array containing symbols to
// throw an exception when toString() is called.
//
// Since there is no guarantee of order:
//
//    - Assert only that the symbol is present
//    - Assert that the length is correct
//
var symbols = Object.getOwnPropertySymbols(C);

assert(symbols.indexOf(sym1) !== -1);
assert(symbols.indexOf(sym2) !== -1);
assert.sameValue(symbols.length, 2);
