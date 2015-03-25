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
