// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.4
description: >
    Throws a TypeError exception if trap is not callable.
info: >
    [[PreventExtensions]] ( )

    ...
    1. Let handler be the value of the [[ProxyHandler]] internal slot of O.
    ...
    5. Let trap be GetMethod(handler, "preventExtensions").
    ...
        7.3.9 GetMethod (O, P)
        ...
        2. Let func be GetV(O, P).
        5. If IsCallable(func) is false, throw a TypeError exception.
        ...
features: [Reflect, Symbol]
---*/

var target = {};
var proxy;

proxy = new Proxy({}, {
    preventExtensions: {}
});
assert.throws(TypeError, function() {
    Reflect.preventExtensions(proxy);
}, "object");

proxy = new Proxy({}, {
    preventExtensions: 42
});
assert.throws(TypeError, function() {
    Reflect.preventExtensions(proxy);
}, "number");

proxy = new Proxy({}, {
    preventExtensions: "function() { 'this is a trap' }"
});
assert.throws(TypeError, function() {
    Reflect.preventExtensions(proxy);
}, "string");

proxy = new Proxy({}, {
    preventExtensions: false
});
assert.throws(TypeError, function() {
    Reflect.preventExtensions(proxy);
}, "boolean");

proxy = new Proxy({}, {
    preventExtensions: Symbol(1)
});
assert.throws(TypeError, function() {
    Reflect.preventExtensions(proxy);
}, "symbol");
