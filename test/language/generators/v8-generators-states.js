// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Test generator states.

// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 
description: >
---*/
function Foo() {}
function Bar() {}

function assertIteratorResult(value, done, result) {
  assert.sameValue(result.value, value);
  assert.sameValue(result.done, done);
}

function assertIteratorIsClosed(iter) {
  assertIteratorResult(undefined, true, iter.next());
  // Next and throw on a closed iterator.
  iter.next();
  assert.throws(Bar, function() { iter.throw(new Bar); });
}

var iter;
function* nextGenerator() { yield iter.next(); }
function* throwGenerator() { yield iter.throw(new Bar); }

// Throw on a suspendedStart iterator.
iter = nextGenerator();
assert.throws(Foo, function() { iter.throw(new Foo) });
assert.throws(Foo, function() { iter.throw(new Foo) });
assertIteratorIsClosed(iter);

// The same.
iter = throwGenerator();
assert.throws(Foo, function() { iter.throw(new Foo) });
assert.throws(Foo, function() { iter.throw(new Foo) });
assertIteratorIsClosed(iter);

// Next on an executing iterator raises a TypeError.
iter = nextGenerator();
assert.throws(TypeError, function() { iter.next() });
assertIteratorIsClosed(iter);

// Throw on an executing iterator raises a TypeError.
iter = throwGenerator();
assert.throws(TypeError, function() { iter.next() });
assertIteratorIsClosed(iter);

// Next on an executing iterator doesn't change the state of the
// generator.
iter = (function* () {
  try {
    iter.next();
    yield 1;
  } catch (e) {
    try {
      // This next() should raise the same exception, because the first
      // next() left the iter in the executing state.
      iter.next();
      yield 2;
    } catch (e) {
      yield 3;
    }
  }
  yield 4;
})();
assertIteratorResult(3, false, iter.next());
assertIteratorResult(4, false, iter.next());
assertIteratorIsClosed(iter);
