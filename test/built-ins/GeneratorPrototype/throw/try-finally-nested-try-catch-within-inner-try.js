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
var iter = g();
var exception = new Error();
var result;

result = iter.next();
assert.sameValue(result.value, 1, 'First result value');
assert.sameValue(result.done, false, 'First result `done` flag');

result = iter.next();
assert.sameValue(result.value, 2, 'Second result `value`');
assert.sameValue(result.done, false, 'Second result `done` flag');

result = iter.throw(exception);
assert.sameValue(result.value, exception, 'Third result `value`');
assert.sameValue(result.done, false, 'Third result `done` flag');

result = iter.next();
assert.sameValue(result.value, 3, 'Fourth result `value');
assert.sameValue(result.done, false, 'Fourth result `done` flag');

result = iter.next();
assert.sameValue(result.value, 4, 'Fifth result `value`');
assert.sameValue(result.done, false, 'Firth result `done` flag');

result = iter.next();
assert.sameValue(result.value, 5, 'Sixth result `value`');
assert.sameValue(result.done, false, 'Sixth result `done` flag');

result = iter.next();
assert.sameValue(
  result.value, undefined, 'Result `value` is undefined when done'
);
assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');

iter.next();
