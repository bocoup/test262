// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.6
description: >
    Throw a TypeError exception if Desc is not configurable and target property
    descriptor is undefined, and trap result is true.
info: >
    [[DefineOwnProperty]] (P, Desc)

    ...
    19. If targetDesc is undefined, then
        ...
        b. If settingConfigFalse is true, throw a TypeError exception.
    ...
---*/

var target = {};
var p = new Proxy(target, {
    defineProperty: function() {
        return true;
    }
});

assert.throws(TypeError, function() {
    Object.defineProperty(p, "foo", {
        configurable: false
    });
});
