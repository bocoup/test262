// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-proxy-object-internal-methods-and-internal-slots-getprototypeof
es6id: 9.5.1
description: >
  Throws if trap is not callable (honoring the Realm of the current execution
  context)
includes: [realm.js]
---*/

var OProxy = $.createRealm().global.Proxy;
var p = new OProxy({}, {
  getPrototypeOf: {}
});

assert.throws(TypeError, function() {
  Object.getPrototypeOf(p);
});
