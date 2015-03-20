// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 25.3.1.4
description: >
    A TypeError should be thrown from GeneratorValidate (25.3.3.2) if the
    context of `throw` does not defined the [[GeneratorState]] internal slot.
---*/

function* g() {}
var iter = g();

assert.throws(TypeError, function() { iter.throw.call(1); });
assert.throws(TypeError, function() { iter.throw.call({}); });
assert.throws(TypeError, function() { iter.throw.call(function() {}); });
assert.throws(TypeError, function() { iter.throw.call(g); });
assert.throws(TypeError, function() { iter.throw.call(g.prototype); });
