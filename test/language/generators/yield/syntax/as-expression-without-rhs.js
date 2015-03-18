// Copyright (C) 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
  description: >
      `yield` is a valid expression within generator function bodies.
  es6id: 14.4
 ---*/

function* g() { (yield) }
function* g() { [yield] }
function* g() { {yield} }
function* g() { yield, yield; }
function* g() { (yield) ? yield : yield }
function* g() {
  (yield)
  ? yield
  : yield
}
