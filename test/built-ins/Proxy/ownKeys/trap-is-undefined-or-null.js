// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.12
esid: sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys
description: >
  Return  target.[[OwnPropertyKeys]]() if trap is null or undefined.
info: |
  [[OwnPropertyKeys]] ( )

  5. Let trap be ? GetMethod(handler, "ownKeys").
  6. If trap is undefined, then
    a. Return ? target.[[OwnPropertyKeys]]().
includes: [compareArray.js]
---*/

var proxy, called;

var expected = ["foo", "bar"];
var target = new Proxy({ foo: 1, bar: 2 }, {
  ownKeys: function(t) {
    assert.sameValue(arguments.length, 1, "trap called with no extra args");
    called += 1;
    return expected;
  }
});

proxy = new Proxy(target, {});
called = 0;
assert(compareArray(Object.keys(proxy), expected), "undefined, return");
assert.sameValue(called, 1, "undefined, called once");

proxy = new Proxy(target, {
  ownKeys: null
});
called = 0;
assert(compareArray(Object.keys(proxy), expected), "null, return");
assert.sameValue(called, 1, "null, called once");

