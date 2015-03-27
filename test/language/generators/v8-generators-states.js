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
