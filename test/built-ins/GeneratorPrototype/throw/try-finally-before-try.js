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
var iter, result;

iter = g();

result = iter.next();
assert.sameValue(result.value, 1, 'First result `value`');
assert.sameValue(
  result.done, false, 'First result `done` flag'
);

assert.throws(Sentinel, function() { iter.throw(new Sentinel()); });

result = iter.next();
assert.sameValue(
  result.value, undefined, 'Result `value` is undefined when done'
);
assert.sameValue( result.done, true, 'Result `done` flag is `true` when done');

iter.next();
