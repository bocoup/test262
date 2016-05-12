// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: TODO
es6id: TODO
description: TODO
info: |
  TODO
includes: [createRealm.js]
---*/

var other = $CREATEREALM();

other.eval("var x = 23;");
assert.sameValue(typeof x, 'undefined');
