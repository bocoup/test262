// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.9
description: >
    Trap is not callable.
info: >
    [[Set]] ( P, V, Receiver)

    6. Let trap be GetMethod(handler, "set").
    ...

    7.3.9 GetMethod (O, P)

    5. If IsCallable(func) is false, throw a TypeError exception.
features: [Symbol]
---*/

var proxy;

proxy = new Proxy({}, {
    set: {}
});
assert.throws(TypeError, function() {
    proxy.attr = 1;
}, "{}");

proxy = new Proxy({}, {
    set: 42
});
assert.throws(TypeError, function() {
    proxy.attr = 1;
}, "number");

proxy = new Proxy({}, {
    set: "function() { 'this is a trap'; }"
});
assert.throws(TypeError, function() {
    proxy.attr = 1;
}, "string");

proxy = new Proxy({}, {
    set: false
});
assert.throws(TypeError, function() {
    proxy.attr = 1;
}, "boolean");

proxy = new Proxy({}, {
    set: Symbol(1)
});
assert.throws(TypeError, function() {
    proxy.attr = 1;
}, "symbol");
