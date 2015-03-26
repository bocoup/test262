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
function Sentinel2() {}
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
  'Throw within outer `try` (before nested try-catch): First result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (before nested try-catch): First result `done` flag'
);
result = iter.throw(new Sentinel());
assert.sameValue(
  result.value,
  4,
  'Throw within outer `try` (before nested try-catch): Second result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (before nested try-catch): Second result `done` flag'
);
assert.throws(Sentinel, function() { iter.next(); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within outer `try` (before nested try-catch): Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw within outer `try` (before nested try-catch): Result `done` flag is `true` when done'
);
iter.next();

iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw within `finally`: First result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `finally`: First result `done` flag'
);
result = iter.throw(new Sentinel());
assert.sameValue(
  result.value, 4, 'Throw within `finally`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `finally`: First result `done` flag'
);
assert.throws(Sentinel2, function() { iter.throw(new Sentinel2()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within `finally`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done, true,
  'Throw within `finally`: Result `done` flag is `true` when done'
);
iter.next();

iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw within inner `try`: First result value'
);
assert.sameValue(
  result.done, false, 'Throw within inner `try`: First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 2, 'Throw within inner `try`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within inner `try`: Second result `done` flag'
);
exception = new Sentinel();
result = iter.throw(exception);
assert.sameValue(
  result.value, exception, 'Throw within inner `try`: Third result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within inner `try`: Third result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 3, 'Throw within inner `try`: Fourth result `value'
);
assert.sameValue(
  result.done, false, 'Throw within inner `try`: Fourth result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 4, 'Throw within inner `try`: Fifth result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within inner `try`: Firth result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 5, 'Throw within inner `try`: Sixth result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within inner `try`: Sixth result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within inner `try`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw within inner `try`: Result `done` flag is `true` when done'
);
iter.next();

iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw within `catch`: First result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `catch`: First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 2, 'Throw within `catch`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `catch`: Second result `done` flag'
);
exception = new Sentinel();
result = iter.throw(exception);
assert.sameValue(
  result.value, exception, 'Throw within `catch`: Third result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `catch`: Third result `done` flag'
);
result = iter.throw(new Sentinel2());
assert.sameValue(
  result.value, 4, 'Throw within `catch`: Fourth result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `catch`: Fourth result `done` flag'
);
assert.throws(Sentinel2, function() { iter.next(); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within `catch`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw witihn `catch`: Result `done` flag is `true` when done'
);
iter.next();

iter = g();
result = iter.next();
assert.sameValue(
  result.value,
  1,
  'Throw within outer `try` (after nested try-catch): First result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (after nested try-catch): First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value,
  2,
  'Throw within outer `try` (after nested try-catch): Second result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (after nested try-catch): Second result `done` flag'
);
exception = new Sentinel();
result = iter.throw(exception);
assert.sameValue(
  result.value,
  exception,
  'Throw within outer `try` (after nested try-catch): Third result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (after nested try-catch): Third result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value,
  3,
  'Throw within outer `try` (after nested try-catch): Fourth result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (after nested try-catch): Fourth result `done` flag'
);
result = iter.throw(new Sentinel2());
assert.sameValue(
  result.value,
  4,
  'Throw within outer `try` (after nested try-catch): Fifth result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw within outer `try` (after nested try-catch): Fifth result `done` flag'
);
assert.throws(Sentinel2, function() { iter.next(); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within outer `try` (after nested try-catch): Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw within outer `try` (after nested try-catch): Result `done` flag is `true` when done'
);
iter.next();
