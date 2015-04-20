// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 25.3.1.4
description: >
    During iteration, the value specified to `throw` should effect control flow
    as though it were declared at the corresponding location within the
    generator function body.
---*/

function* g() {
  try {
    yield 1;
    try {
      yield 2;
    } catch (e) {
      yield e;
    }
    yield 3;
  } finally {
    yield 4;
  }
  yield 5;
}
function Sentinel() {}
var iter = g();
var result;

iter = g();

result = iter.next();
assert.sameValue(result.value, 1, 'First result `value`');
assert.sameValue(result.done, false, 'First result `done` flag');

result = iter.throw(new Sentinel());
assert.sameValue(result.value, 4, 'Second result `value`');
assert.sameValue(result.done, false, 'Second result `done` flag');

assert.throws(Sentinel, function() { iter.next(); });

result = iter.next();
assert.sameValue(
  result.value, undefined, 'Result `value` is undefined when done'
);
assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');

iter.next();
