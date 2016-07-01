// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.4
description: >
  Return target.[[PreventExtensions]]() if trap is null or undefined.
info: |
  [[PreventExtensions]] ( )

  5. Let trap be ? GetMethod(handler, "preventExtensions").
  6. If trap is undefined, then
    7. Return ? target.[[PreventExtensions]]().
features: [Reflect]
---*/

var proxy, called;

var target = new Proxy({}, {
  preventExtensions: function(t) {
    assert.sameValue(arguments.length, 1, "trap called with no extra args");
    called += 1;
  }
});

proxy = new Proxy(target, {});
called = 0;
assert.sameValue(Reflect.preventExtensions(proxy), false, "undefined, return");
assert.sameValue(called, 1, "undefined, called");

proxy = new Proxy(target, {
  preventExtensions: null
});
called = 0;
assert.sameValue(Reflect.preventExtensions(proxy), false, "null, return");
assert.sameValue(called, 1, "null, called");
