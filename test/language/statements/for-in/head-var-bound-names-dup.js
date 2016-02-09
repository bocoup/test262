// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: The head's declaration may contain duplicate entries
id: sec-for-in-and-for-of-statements-static-semantics-early-errors
es6id: 13.7
---*/

var iterCount = 0;

for (var [x, x] in { ab: null }) {
  assert.sameValue(x, 'b');
  iterCount += 1;
}

assert.sameValue(iterCount, 1);
