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
  yield 1;
  try {
    yield 2;
  } finally {
    yield 3;
  }
  yield 4;
}
function Sentinel() {}
var iter, result, exception;

iter = g();
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw before iteration: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw before iteration: Result `done` flag is `true` when done'
);
iter.next();

iter = g();
result = iter.next();
assert.sameValue(
  result.value,
  1,
  'Throw before `try`: First result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw before `try`: First result `done` flag'
);
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw before `try`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw before `try`: Result `done` flag is `true` when done'
);
iter.next();

exception = new Sentinel();
iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw within `try`: First result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `try`: First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 2, 'Throw within `try`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `try`: Second result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 3, 'Throw within `try`: Third result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `try`: Third result `done` flag'
);
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within `try`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw within `try`: Result `done` flag is `true` when done'
);
iter.next();

exception = new Sentinel();
iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw within `finally`: First result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `finally`: First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 2, 'Throw within `finally`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `finally`: Second result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 3, 'Throw within `finally`: Third result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `finally`: Third result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 4, 'Throw within `finally`: Fourth result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `finally`: Fourth result `done` flag'
);
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within `finally`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw within `finally`: Result `done` flag is `true` when done'
);
iter.next();

exception = new Sentinel();
iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw following `finally`: First result `value`'
);
assert.sameValue(
  result.done, false, 'Throw following `finally`: First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 2, 'Throw following `finally`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw following `finally`: Second result `done` flag'
);
result = iter.throw(exception);
assert.sameValue(
  result.value, 3, 'Throw following `finally`: Third result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw following `finally`: Third result `done` flag'
);
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw following `finally`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw following `finally`: Result `done` flag is `true` when done'
);
iter.next();
