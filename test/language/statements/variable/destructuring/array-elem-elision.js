// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    ArrayBindingPattern may include elisions at any position in a
    BindingElementList that does not contain an AssignmentRestElement.
es6id: 13.2.3
---*/

[, x, , y, ,] = [1, 2, 3, 4, 5, 6];

assert.sameValue(x, 2);
assert.sameValue(y, 4);
