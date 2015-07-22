// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.2.1
description: >
  Replace default values
---*/

function fn(a = 1, b = 2, c = 3) {
  return [a, b, c];
}

var results = fn('', 42, null);

assert.sameValue(results[0], '', 'replace default values #1');
assert.sameValue(results[1], 42, 'replace default values #2');
assert.sameValue(results[2], null, 'replace default values #3');
