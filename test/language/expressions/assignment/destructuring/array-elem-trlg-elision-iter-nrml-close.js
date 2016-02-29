// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: IteratorClose invoked when elision does not exhaust the iterator
info: |
    ArrayAssignmentPattern :
        [ AssignmentElementList , Elisionopt AssignmentRestElementopt ]

    [...]
    6. If Elision is present, then
       a. Let status be the result of performing
          IteratorDestructuringAssignmentEvaluation of Elision with
          iteratorRecord as the argument.
       b. If status is an abrupt completion, then
          [...]
    8. If iteratorRecord.[[done]] is false, return IteratorClose(iterator,
       status).
features: [Symbol.iterator]
es6id: 12.14.5.2
esid: sec-runtime-semantics-destructuringassignmentevaluation
---*/

var nextCount = 0;
var returnCount = 0;
var iterable = {};
var x;
var iterator = {
  next: function() {
    nextCount += 1;

    // Set an upper-bound to limit unnecessary iteration in non-conformant
    // implementations
    return { done: nextCount > 10 };
  },
  return: function() {
    returnCount += 1;
    return {};
  }
};
iterable[Symbol.iterator] = function() {
  return iterator;
};

[ x , , ] = iterable;

assert.sameValue(nextCount, 2);
assert.sameValue(returnCount, 1);
