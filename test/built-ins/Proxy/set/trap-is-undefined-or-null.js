// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.9
description: >
  Return target.[[Set]](P, V, Receiver) if trap is null or undefined
info: |
  [[Set]] ( P, V, Receiver)

  6. Let trap be ? GetMethod(handler, "set").
  7. If trap is undefined, then
    a. Return ? target.[[Set]](P, V, Receiver).

  GetMethod (V, P)

  2. Let func be ? GetV(V, P).
  3. If func is either undefined or null, return undefined.
---*/

var call, proxy;
var target = new Proxy({}, {
  set: function(t, p, v, r) {
    call = {
      p: p,
      v: v,
      r: r
    };
    return true;
  }
});

proxy = new Proxy(target, {
  set: undefined
});
call = false;
proxy.attr = 42;
assert.sameValue(call.p, "attr", "undefined trap, p is set");
assert.sameValue(call.v, 42, "undefined trap, v is set");
assert.sameValue(call.r, proxy, "undefined trap, r is set");

proxy = new Proxy(target, {
  set: null
});
call = false;
proxy.attr = 42;
assert.sameValue(call.p, "attr", "null trap, p is set");
assert.sameValue(call.v, 42, "null trap, v is set");
assert.sameValue(call.r, proxy, "null trap, r is set");
