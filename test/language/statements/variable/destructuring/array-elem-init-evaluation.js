// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    The Initializer should only be evaluated if v is undefined.
es6id: 13.2.3.6
---*/

var flag;

flag = false;
var [ a = flag = true ] = [];
assert.sameValue(a, true);
assert.sameValue(flag, true);

flag = false;
var [ b = flag = true ] = [14];
assert.sameValue(b, 14);
assert.sameValue(flag, false);
