// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 25.3.1.4
description: >
    
---*/

function* g() {
  yield 1;
  try {
    yield 2;
  } catch (e) {
    yield e;
  }
  yield 3;
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
result = iter.throw(exception);
assert.sameValue(
  result.value, exception, 'Throw within `try`: Third result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `try`: Third result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 3, 'Throw within `try`: Fourth result `done` flag'
);
assert.sameValue(
  result.done, false, 'Throw within `try`: Fourth result `value`'
);
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
result = iter.throw(exception);
assert.sameValue(
  result.value, exception, 'Throw within `catch`: Third result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `catch`: Third result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 3, 'Throw within `catch`: Fourth result `value`'
);
assert.sameValue(
  result.done, false, 'Throw within `catch`: Fourth result `done` flag'
);
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value,
  undefined,
  'Throw within `catch`: Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw within `catch`: Result `done` flag is `true` when done'
);
iter.next();

exception = new Sentinel();
iter = g();
result = iter.next();
assert.sameValue(
  result.value, 1, 'Throw following `catch`: First result `value`'
);
assert.sameValue(
  result.done, false, 'Throw following `catch`: First result `done` flag'
);
result = iter.next();
assert.sameValue(
  result.value, 2, 'Throw following `catch`: Second result `value`'
);
assert.sameValue(
  result.done, false, 'Throw following `catch`: Second result `done` flag'
);
result = iter.throw(exception);
assert.sameValue(
  result.value, exception, 'Throw following `catch`: Third result `value`'
);
assert.sameValue(
  result.done,
  false,
  'Throw following `catch`: Third result `done` flag'
);
assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });
result = iter.next();
assert.sameValue(
  result.value, undefined, 'Result `value` is undefined when done'
);
assert.sameValue(
  result.done,
  true,
  'Throw following `catch`: Result `done` flag is `true` when done'
);
iter.next();
