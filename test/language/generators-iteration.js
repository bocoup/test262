// Copyright 2013 the V8 project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above
//       copyright notice, this list of conditions and the following
//       disclaimer in the documentation and/or other materials provided
//       with the distribution.
//     * Neither the name of Google Inc. nor the names of its
//       contributors may be used to endorse or promote products derived
//       from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

// Flags: --expose-gc

// Test generator iteration.

// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 
description: >
---*/
var GeneratorFunction = Object.getPrototypeOf(function*(){yield 1;}).constructor;

function TestGeneratorResultPrototype() {
  function* g() { yield 1; }
  var iter = g();
  var result = iter.next();

  assert.sameValue(Object.getPrototypeOf(result), Object.prototype);
  property_names = Object.getOwnPropertyNames(result);

  assert(Object.hasOwnProperty.call(result, 'done'));
  assert(Object.hasOwnProperty.call(result, 'value'));

  result = result;
  assert.sameValue(result.value, 1);
  assert.sameValue(result.done, false);
}
TestGeneratorResultPrototype();

function TestGenerator(g, expected_values_for_next,
                       send_val, expected_values_for_send) {
  function testNext(thunk) {
    var iter = thunk();
    for (var i = 0; i < expected_values_for_next.length; i++) {
      var v1 = expected_values_for_next[i];
      var v2 = i == expected_values_for_next.length - 1;
      // var v3 = iter.next();
      result = iter.next();
      assert.sameValue(result.value, v1);
      assert.sameValue(result.done, v2);
    }
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  function testSend(thunk) {
    var iter = thunk();
    var result;
    for (var i = 0; i < expected_values_for_send.length; i++) {
      result = iter.next(send_val);
      assert.sameValue(result.value, expected_values_for_send[i]);
      assert.sameValue(result.done, i == expected_values_for_send.length - 1);
    }
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  function testThrow(thunk) {
    var result;
    for (var i = 0; i < expected_values_for_next.length; i++) {
      var iter = thunk();
      for (var j = 0; j < i; j++) {
        result = iter.next();
        assert.sameValue(result.value, expected_values_for_next[j]);
        assert.sameValue(result.done, j == expected_values_for_next.length - 1);
      }
      function Sentinel() {}
      assert.throws(Sentinel, function () { iter.throw(new Sentinel); });
      result = iter.next();
      assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
      assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
      iter.next();;
    }
  }

  testNext(g);
  testSend(g);
  testThrow(g);

  testNext(function*() { return yield* g(); });
  testSend(function*() { return yield* g(); });
  testThrow(function*() { return yield* g(); });

  if (g instanceof GeneratorFunction) {
    testNext(function() { return new g(); });
    testSend(function() { return new g(); });
    testThrow(function() { return new g(); });
  }
}

// Receivers.
TestGenerator(
    function g17() {
      function* g() { yield this.x; yield this.y; }
      var o = { start: g, x: 1, y: 2 };
      return o.start();
    },
    [1, 2, undefined],
    "foo",
    [1, 2, undefined]);

TestGenerator(
    function g18() {
      function* g() { yield this.x; yield this.y; }
      var iter = new g;
      iter.x = 1;
      iter.y = 2;
      return iter;
    },
    [1, 2, undefined],
    "foo",
    [1, 2, undefined]);

TestGenerator(
    function* g19() {
      var x = 1;
      yield x;
      with({x:2}) { yield x; }
      yield x;
    },
    [1, 2, 1, undefined],
    "foo",
    [1, 2, 1, undefined]);

TestGenerator(
    function* g20() { yield (1 + (yield 2) + 3); },
    [2, NaN, undefined],
    "foo",
    [2, "1foo3", undefined]);

TestGenerator(
    function* g21() { return (1 + (yield 2) + 3); },
    [2, NaN],
    "foo",
    [2, "1foo3"]);

TestGenerator(
    function* g22() { yield (1 + (yield 2) + 3); yield (4 + (yield 5) + 6); },
    [2, NaN, 5, NaN, undefined],
    "foo",
    [2, "1foo3", 5, "4foo6", undefined]);

TestGenerator(
    function* g23() {
      return (yield (1 + (yield 2) + 3)) + (yield (4 + (yield 5) + 6));
    },
    [2, NaN, 5, NaN, NaN],
    "foo",
    [2, "1foo3", 5, "4foo6", "foofoo"]);

// Rewind a try context with and without operands on the stack.
TestGenerator(
    function* g24() {
      try {
        return (yield (1 + (yield 2) + 3)) + (yield (4 + (yield 5) + 6));
      } catch (e) {
        throw e;
      }
    },
    [2, NaN, 5, NaN, NaN],
    "foo",
    [2, "1foo3", 5, "4foo6", "foofoo"]);

// Yielding in a catch context, with and without operands on the stack.
TestGenerator(
    function* g25() {
      try {
        throw (yield (1 + (yield 2) + 3))
      } catch (e) {
        if (typeof e == 'object') throw e;
        return e + (yield (4 + (yield 5) + 6));
      }
    },
    [2, NaN, 5, NaN, NaN],
    "foo",
    [2, "1foo3", 5, "4foo6", "foofoo"]);

// Yield with no arguments yields undefined.
TestGenerator(
    function* g26() { return yield yield; },
    [undefined, undefined, undefined],
    "foo",
    [undefined, "foo", "foo"]);

// A newline causes the parser to stop looking for an argument to yield.
TestGenerator(
    function* g27() {
      yield
      3
      return
    },
    [undefined, undefined],
    "foo",
    [undefined, undefined]);

// TODO(wingo): We should use TestGenerator for these, except that
// currently yield* will unconditionally propagate a throw() to the
// delegate iterator, which fails for these iterators that don't have
// throw().  See http://code.google.com/p/v8/issues/detail?id=3484.
(function() {
    function* g28() {
      yield* [1, 2, 3];
    }
    var iter = g28();
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined);
    assert.sameValue(result.done, true);
})();

(function() {
    function* g29() {
      yield* "abc";
    }
    var iter = g29();
    result = iter.next();
    assert.sameValue(result.value, "a");
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, "b");
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, "c");
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined);
    assert.sameValue(result.done, true);
})();

// Generator function instances.
TestGenerator(GeneratorFunction(),
              [undefined],
              "foo",
              [undefined]);

TestGenerator(new GeneratorFunction(),
              [undefined],
              "foo",
              [undefined]);

TestGenerator(GeneratorFunction('yield 1;'),
              [1, undefined],
              "foo",
              [1, undefined]);

TestGenerator(
    function() { return GeneratorFunction('x', 'y', 'yield x + y;')(1, 2) },
    [3, undefined],
    "foo",
    [3, undefined]);

// Access to this with formal arguments.
TestGenerator(
    function () {
      return ({ x: 42, g: function* (a) { yield this.x } }).g(0);
    },
    [42, undefined],
    "foo",
    [42, undefined]);

// Test that yield* re-yields received results without re-boxing.
function TestDelegatingYield() {
  function results(results) {
    var i = 0;
    function next() {
      return results[i++];
    }
    var iter = { next: next };
    var ret = {};
    ret[Symbol.iterator] = function() { return iter; };
    return ret;
  }
  function* yield_results(expected) {
    return yield* results(expected);
  }
  function collect_results(iterable) {
    var iter = iterable[Symbol.iterator]();
    var ret = [];
    var result;
    do {
      result = iter.next();
      ret.push(result);
    } while (!result.done);
    return ret;
  }
  // We have to put a full result for the end, because the return will re-box.
  var expected = [{value: 1}, 13, "foo", {value: 34, done: true}];
  var result, iter;

  // Sanity check.
  iter = results(expected)[Symbol.iterator]();
  result = iter.next();
  assert.sameValue(result, expected[0]);

  result = iter.next();
  assert.sameValue(result, expected[1]);

  result = iter.next();
  assert.sameValue(result, expected[2]);

  result = iter.next();
  assert.sameValue(result, expected[3]);

  iter = yield_results(expected)[Symbol.iterator]();
  result = iter.next();
  assert.sameValue(result, expected[0]);

  result = iter.next();
  assert.sameValue(result, expected[1]);

  result = iter.next();
  assert.sameValue(result, expected[2]);

  result = iter.next();
  // TODO: Figure out why this fails
  //assert.sameValue(result, expected[3]);
}
TestDelegatingYield();

function TestTryCatch(instantiate) {
  function* g() { yield 1; try { yield 2; } catch (e) { yield e; } yield 3; }
  function Sentinel() {}

  function Test1(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test1(instantiate(g));

  function Test2(iter) {
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test2(instantiate(g));

  function Test3(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test3(instantiate(g));

  function Test4(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    var exn = new Sentinel;
    result = iter.throw(exn);
    assert.sameValue(result.value, exn);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test4(instantiate(g));

  function Test5(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    var exn = new Sentinel;
    result = iter.throw(exn);
    assert.sameValue(result.value, exn);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test5(instantiate(g));

  function Test6(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    var exn = new Sentinel;
    result = iter.throw(exn);
    assert.sameValue(result.value, exn);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test6(instantiate(g));

  function Test7(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test7(instantiate(g));
}
TestTryCatch(function (g) { return g(); });
TestTryCatch(function* (g) { return yield* g(); });

function TestTryFinally(instantiate) {
  function* g() { yield 1; try { yield 2; } finally { yield 3; } yield 4; }
  function Sentinel() {}
  function Sentinel2() {}

  function Test1(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test1(instantiate(g));

  function Test2(iter) {
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test2(instantiate(g));

  function Test3(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test3(instantiate(g));

  function Test4(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.throw(new Sentinel);
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.next(); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test4(instantiate(g));

  function Test5(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.throw(new Sentinel);
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel2, function() { iter.throw(new Sentinel2); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test5(instantiate(g));

  function Test6(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test6(instantiate(g));

  function Test7(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test7(instantiate(g));

  function Test8(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test8(instantiate(g));
}
TestTryFinally(function (g) { return g(); });
TestTryFinally(function* (g) { return yield* g(); });

function TestNestedTry(instantiate) {
  function* g() {
    try {
      yield 1;
      try { yield 2; } catch (e) { yield e; }
      yield 3;
    } finally {
      yield 4;
    }
    yield 5;
  }
  function Sentinel() {}
  function Sentinel2() {}

  function Test1(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 5);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test1(instantiate(g));

  function Test2(iter) {
    assert.throws(Sentinel, function() { iter.throw(new Sentinel); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test2(instantiate(g));

  function Test3(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.throw(new Sentinel);
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel, function() { iter.next(); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test3(instantiate(g));

  function Test4(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.throw(new Sentinel);
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel2, function() { iter.throw(new Sentinel2); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test4(instantiate(g));

  function Test5(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    var exn = new Sentinel;
    result = iter.throw(exn);
    assert.sameValue(result.value, exn);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 5);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test5(instantiate(g));

  function Test6(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    var exn = new Sentinel;
    result = iter.throw(exn);
    assert.sameValue(result.value, exn);
    assert.sameValue(result.done, false);
    result = iter.throw(new Sentinel2);
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel2, function() { iter.next(); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test6(instantiate(g));

  function Test7(iter) {
    result = iter.next();
    assert.sameValue(result.value, 1);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 2);
    assert.sameValue(result.done, false);
    var exn = new Sentinel;
    result = iter.throw(exn);
    assert.sameValue(result.value, exn);
    assert.sameValue(result.done, false);
    result = iter.next();
    assert.sameValue(result.value, 3);
    assert.sameValue(result.done, false);
    result = iter.throw(new Sentinel2);
    assert.sameValue(result.value, 4);
    assert.sameValue(result.done, false);
    assert.throws(Sentinel2, function() { iter.next(); });
    result = iter.next();
    assert.sameValue(result.value, undefined, 'Result `value` is undefined when done');
    assert.sameValue(result.done, true, 'Result `done` flag is `true` when done');
    iter.next();;
  }
  Test7(instantiate(g));

  // That's probably enough.
}
TestNestedTry(function (g) { return g(); });
TestNestedTry(function* (g) { return yield* g(); });

function TestRecursion() {
  function TestNextRecursion() {
    function* g() { yield iter.next(); }
    var iter = g();
    return iter.next();
  }
  function TestSendRecursion() {
    function* g() { yield iter.next(42); }
    var iter = g();
    return iter.next();
  }
  function TestThrowRecursion() {
    function* g() { yield iter.throw(1); }
    var iter = g();
    return iter.next();
  }
  assert.throws(TypeError, TestNextRecursion);
  assert.throws(TypeError, TestSendRecursion);
  assert.throws(TypeError, TestThrowRecursion);
}
TestRecursion();
