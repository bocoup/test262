// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    If the Initializer is present and v is undefined, the Initializer should be
    evaluated and the result assigned to the target reference.
es6id: 13.2.3.6
---*/

var [ a = 10 ] = [];

assert.sameValue(a, 10, 'no element at index');

var [ b = 11 ] = [2];

assert.sameValue(b, 2, 'element at index (truthy value)');

var [ c = 12 ] = [ null ];

assert.sameValue(c, null, 'element at index (`null`)');

var [ d = 13 ] = [ undefined ];

assert.sameValue(d, 13, 'element at index (`undefined`)');

var [ e = 14 ] = [ , ];

assert.sameValue(e, 14, 'element at index (sparse array)');
