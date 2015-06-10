// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    Identifiers that appear as the SingleNameBinding in an BindingElement
    should take on the iterated value corresponding to their position in the
    ArrayBindingPattern.
es6id: 13.2.3.6
flags: [noStrict]
---*/

var [arguments = 4, eval = 5] = [];

assert.sameValue(arguments, 4);
assert.sameValue(eval, 5);
