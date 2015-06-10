// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    When a `yield` token appears within the Initializer of an
    BindingElement within a generator function body, it behaves as a
    YieldExpression.
es6id: 13.2.3.6
features: [generators]
---*/

var result, iter, y;

iter = (function*() {
  var [ x = yield ] = [];
  y = x;
})();

result = iter.next();

assert.sameValue(result.value, undefined);
assert.sameValue(result.done, false);
assert.sameValue(y, undefined);

result = iter.next(86);

assert.sameValue(result.value, undefined);
assert.sameValue(result.done, true);
assert.sameValue(y, 86);
