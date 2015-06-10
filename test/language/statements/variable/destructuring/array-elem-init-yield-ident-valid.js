// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    When a `yield` token appears within the Initializer of an BindingElement
    outside of a generator function body, it behaves as an IdentifierReference.
es6id: 12.2.3.6
flags: [noStrict]
---*/

var yield = 4;
var result;

var [ x = yield ] = [];

assert.sameValue(x, 4);
