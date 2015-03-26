// Copyright (C) 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    GeneratorFunction instances are created with a unique prototype object.
es6id: 25.2.1
---*/

function* fromDecl1() {}
function* fromDecl2() {}
var fromExpr1 = function*() {};
var fromExpr2 = function*() {};

assert(fromDecl1.prototype !== fromDecl2.prototype);
assert(fromDecl1.prototype !== fromExpr2.prototype);
assert(fromExpr1.prototype !== fromExpr2.prototype);
