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

// Flags: --harmony-scoping --harmony-proxies

// Test for-of semantics.

// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 
description: >
---*/
(function() {
"use strict";


// First, some helpers.

function wrap_iterator(iterator) {
    var iterable = {};
    iterable[Symbol.iterator] = function() { return iterator; };
    return iterable;
}

function integers_until(max) {
  function next() {
    var ret = { value: this.n, done: this.n == max };
    this.n++;
    return ret;
  }
  return wrap_iterator({ next: next, n: 0 });
}

function results(results) {
  var i = 0;
  function next() {
    return results[i++];
  }
  return wrap_iterator({ next: next });
}

// A destructive append.
function append(x, tail) {
  tail[tail.length] = x;
  return tail;
}

function sum(x, tail) {
  return x + tail;
}

function fold(cons, seed, iterable) {
  for (var x of iterable) {
    seed = cons(x, seed);
  }
  return seed;
}

function* take(iterable, n) {
  if (n == 0) return;
  for (let x of iterable) {
    yield x;
    if (--n == 0) break;
  }
}

function* iter_map(iterable, f) {
  for (var x of iterable) {
    yield f(x);
  }
}
function nested_fold(cons, seed, iterable) {
  var visited = []
  for (let x of iterable) {
    for (let y of x) {
      seed = cons(y, seed);
    }
  }
  return seed;
}

function* unreachable(iterable) {
  for (let x of iterable) {
    throw "not reached";
  }
}

function one_time_getter(o, prop, val) {
  function set_never() { throw "unreachable"; }
  var gotten = false;
  function get_once() {
    if (gotten) throw "got twice";
    gotten = true;
    return val;
  }
  Object.defineProperty(o, prop, {get: get_once, set: set_never})
  return o;
}

function never_getter(o, prop) {
  function never() { throw "unreachable"; }
  Object.defineProperty(o, prop, {get: never, set: never})
  return o;
}

function remove_next_after(iterable, n) {
  var iterator = iterable[Symbol.iterator]();
  function next() {
    if (n-- == 0) delete this.next;
    return iterator.next();
  }
  return wrap_iterator({ next: next });
}

function poison_next_after(iterable, n) {
  var iterator = iterable[Symbol.iterator]();
  function next() {
    return iterator.next();
  }
  function next_getter() {
    if (n-- < 0)
      throw "poisoned";
    return next;
  }
  var o = {};
  Object.defineProperty(o, 'next', { get: next_getter });
  return wrap_iterator(o);
}

// Now, the tests.
var result;

// Unlike the case with for-in, null and undefined cause an error.
assert.throws(TypeError, 'fold(sum, 0, unreachable(null))');
assert.throws(TypeError, 'fold(sum, 0, unreachable(undefined))');

// Other non-iterators do cause an error.
assert.throws(TypeError, 'fold(sum, 0, unreachable({}))');
assert.throws(TypeError, 'fold(sum, 0, unreachable(false))');
assert.throws(TypeError, 'fold(sum, 0, unreachable(37))');

// "next" is looked up each time.
assert.throws(TypeError,
             'fold(sum, 0, remove_next_after(integers_until(10), 5))');

// It is not called at any other time.
assert.sameValue(fold(sum, 0, remove_next_after(integers_until(10), 10)), 45);

// It is not looked up too many times.
assert.sameValue(fold(sum, 0, poison_next_after(integers_until(10), 10)), 45);

function labelled_continue(iterable) {
  var n = 0;
outer:
  while (true) {
    n++;
    for (var x of iterable) continue outer;
    break;
  }
  return n;
}
assert.sameValue(labelled_continue(integers_until(10)), 11);

function labelled_break(iterable) {
  var n = 0;
outer:
  while (true) {
    n++;
    for (var x of iterable) break outer;
  }
  return n;
}
assert.sameValue(labelled_break(integers_until(10)), 1);

// Test continue/break in catch.
function catch_control(iterable, k) {
  var n = 0;
  for (var x of iterable) {
    try {
      return k(x);
    } catch (e) {
      if (e == "continue") continue;
      else if (e == "break") break;
      else throw e;
    }
  } while (false);
  return false;
}
assert.sameValue(catch_control(integers_until(10),
                           function() { throw "break" }), false);
assert.sameValue(catch_control(integers_until(10),
                           function() { throw "continue" }), false);
assert.sameValue(catch_control(integers_until(10),
                           function(x) {
                             if (x == 5) return x;
                             throw "continue";
                           }), 5);

// Test continue/break in try.
function try_control(iterable, k) {
  var n = 0;
  for (var x of iterable) {
    try {
      var e = k(x);
      if (e == "continue") continue;
      else if (e == "break") break;
      return e;
    } catch (e) {
      throw e;
    }
  } while (false);
  return false;
}
assert.sameValue(try_control(integers_until(10),
                         function() { return "break" }), false);
assert.sameValue(try_control(integers_until(10),
                         function() { return "continue" }), false);
assert.sameValue(try_control(integers_until(10),
                         function(x) { return (x == 5) ? x : "continue" }), 5);

// Proxy results, with getters.
function transparent_proxy(x) {
  return Proxy.create({
    get: function(receiver, name) { return x[name]; }
  });
}
result = fold(append, [],
                  results([one_time_getter({ value: 1 }, 'done', false),
                           one_time_getter({ done: false }, 'value', 2),
                           { value: 37, done: true },
                           never_getter(never_getter({}, 'done'), 'value')]
                          .map(transparent_proxy)))
assert.sameValue(result[0], 1);
assert.sameValue(result[1], 2);
assert.sameValue(result.length, 2);

// Proxy iterators.
function poison_proxy_after(iterable, n) {
  var iterator = iterable[Symbol.iterator]();
  return wrap_iterator(Proxy.create({
    get: function(receiver, name) {
      if (name == 'next' && n-- < 0) throw "unreachable";
      return iterator[name];
    },
    // Needed for integers_until(10)'s this.n++.
    set: function(receiver, name, val) {
      return iterator[name] = val;
    }
  }));
}
assert.sameValue(fold(sum, 0, poison_proxy_after(integers_until(10), 10)), 45);
}());
