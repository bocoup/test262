// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE.v8 file.

/*---
es6id: S.9.4.4.6_A1
description: Arguments Exotic objects implement the iterator interface
flags:
- noStrict
---*/

function TestDirectArgumentsIteratorProperty() {
  assert(arguments.hasOwnProperty(Symbol.iterator));
  assert.sameValue(arguments.propertyIsEnumerable(Symbol.iterator), false);
  var descriptor = Object.getOwnPropertyDescriptor(arguments, Symbol.iterator);
  assert(descriptor.writable);
  assert.sameValue(descriptor.enumerable, false);
  assert(descriptor.configurable);
  assert.sameValue(descriptor.value, [][Symbol.iterator]);
  assert.sameValue(arguments[Symbol.iterator], [][Symbol.iterator]);
}
TestDirectArgumentsIteratorProperty();


function TestIndirectArgumentsIteratorProperty() {
  var o = arguments;
  assert(o.hasOwnProperty(Symbol.iterator));
  assert.sameValue(o.propertyIsEnumerable(Symbol.iterator), false);
  assert.sameValue(o[Symbol.iterator], [][Symbol.iterator]);
}
TestIndirectArgumentsIteratorProperty();


function assertIteratorResult(value, done, result) {
  assert.sameValue(value, result.value);
  assert.sameValue(done, result.done);
}


function TestDirectValues1(a, b, c) {
  var iterator = arguments[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());
  assertIteratorResult(c, false, iterator.next());
  assertIteratorResult(undefined, true, iterator.next());
}
TestDirectValues1(1, 2, 3);


function TestIndirectValues1(a, b, c) {
  var args = arguments;
  var iterator = args[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());
  assertIteratorResult(c, false, iterator.next());
  assertIteratorResult(undefined, true, iterator.next());
}
TestIndirectValues1(1, 2, 3);


function TestDirectValues2(a, b, c) {
  var iterator = arguments[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());
  assertIteratorResult(c, false, iterator.next());
  assertIteratorResult(undefined, true, iterator.next());

  arguments[3] = 4;
  arguments.length = 4;
  assertIteratorResult(undefined, true, iterator.next());
}
TestDirectValues2(1, 2, 3);


function TestIndirectValues2(a, b, c) {
  var args = arguments;
  var iterator = args[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());
  assertIteratorResult(c, false, iterator.next());
  assertIteratorResult(undefined, true, iterator.next());

  arguments[3] = 4;
  arguments.length = 4;
  assertIteratorResult(undefined, true, iterator.next());
}
TestIndirectValues2(1, 2, 3);


function TestDirectValues3(a, b, c) {
  var iterator = arguments[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());

  arguments.length = 2;
  assertIteratorResult(undefined, true, iterator.next());
}
TestDirectValues3(1, 2, 3);


function TestIndirectValues3(a, b, c) {
  var args = arguments;
  var iterator = args[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());

  arguments.length = 2;
  assertIteratorResult(undefined, true, iterator.next());
}
TestIndirectValues3(1, 2, 3);


function TestDirectValues4(a, b, c) {
  var iterator = arguments[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());
  assertIteratorResult(c, false, iterator.next());

  arguments.length = 4;
  assertIteratorResult(undefined, false, iterator.next());
  assertIteratorResult(undefined, true, iterator.next());
}
TestDirectValues4(1, 2, 3);


function TestIndirectValues4(a, b, c) {
  var args = arguments;
  var iterator = args[Symbol.iterator]();
  assertIteratorResult(a, false, iterator.next());
  assertIteratorResult(b, false, iterator.next());
  assertIteratorResult(c, false, iterator.next());

  arguments.length = 4;
  assertIteratorResult(undefined, false, iterator.next());
  assertIteratorResult(undefined, true, iterator.next());
}
TestIndirectValues4(1, 2, 3);


function TestForOf() {
  var i = 0;
  for (var value of arguments) {
    assert.sameValue(arguments[i++], value);
  }

  assert.sameValue(arguments.length, i);
}
TestForOf(1, 2, 3, 4, 5);


function TestAssignmentToIterator() {
  var i = 0;
  arguments[Symbol.iterator] = [].entries;
  for (var entry of arguments) {
    assert.sameValue(i, entry[0]);
    assert.sameValue(arguments[i], entry[1]);
    i++;
  }

  assert.sameValue(arguments.length, i);
}
TestAssignmentToIterator(1, 2, 3, 4, 5);


function TestArgumentsMutation() {
  var i = 0;
  for (var x of arguments) {
    assert.sameValue(arguments[i], x);
    arguments[i+1] *= 2;
    i++;
  }

  assert.sameValue(arguments.length, i);
}
TestArgumentsMutation(1, 2, 3, 4, 5);


function TestSloppyArgumentsAliasing(a0, a1, a2, a3, a4) {
  var i = 0;
  for (var x of arguments) {
    assert.sameValue(arguments[i], x);
    a0 = a1; a1 = a2; a3 = a4;
    i++;
  }

  assert.sameValue(arguments.length, i);
}
TestSloppyArgumentsAliasing(1, 2, 3, 4, 5);


function TestStrictArgumentsAliasing(a0, a1, a2, a3, a4) {
  "use strict";
  var i = 0;
  for (var x of arguments) {
    a0 = a1; a1 = a2; a3 = a4;
    assert.sameValue(arguments[i], x);
    i++;
  }

  assert.sameValue(arguments.length, i);
}
TestStrictArgumentsAliasing(1, 2, 3, 4, 5);


function TestArgumentsAsProto() {
  "use strict";

  var o = {__proto__:arguments};
  assert.sameValue(o[Symbol.iterator], [][Symbol.iterator]);
  // Make o dict-mode.
  assert.sameValue(o.hasOwnProperty(Symbol.iterator), false);
  assert.sameValue(o[Symbol.iterator], [][Symbol.iterator]);
  o[Symbol.iterator] = 10;
  assert(o.hasOwnProperty(Symbol.iterator));
  assert.sameValue(10, o[Symbol.iterator]);
  assert.sameValue(arguments[Symbol.iterator], [][Symbol.iterator]);

  // Frozen o.
  o = Object.freeze({__proto__:arguments});
  assert.sameValue(o[Symbol.iterator], [][Symbol.iterator]);
  assert.sameValue(o.hasOwnProperty(Symbol.iterator), false);
  assert.sameValue(o[Symbol.iterator], [][Symbol.iterator]);
  // This should throw, but currently it doesn't, because
  // ExecutableAccessorInfo callbacks don't see the current strict mode.
  // See note in accessors.cc:SetPropertyOnInstanceIfInherited.
  o[Symbol.iterator] = 10;
  assert.sameValue(o.hasOwnProperty(Symbol.iterator), false);
  assert.sameValue([][Symbol.iterator], o[Symbol.iterator]);
  assert.sameValue(arguments[Symbol.iterator], [][Symbol.iterator]);
}
TestArgumentsAsProto();
