// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 9.5.12
esid: sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys
description: >
  Return trapResult if extensibleTarget is true and targetNonconfigurableKeys is
  empty
info: |
  [[OwnPropertyKeys]] ( )

  5. Let trap be ? GetMethod(handler, "ownKeys").
  ...
  7. Let trapResultArray be ? Call(trap, handler, « target »).
  8. Let trapResult be ? CreateListFromArrayLike(trapResultArray, « String,
     Symbol »).
  ...
  15. If extensibleTarget is true and targetNonconfigurableKeys is empty, then
    a. Return trapResult.
includes: [compareArray.js]
---*/

var expected = ["foo", "bar"];
var proxy = new Proxy({ baz: 1 }, {
  ownKeys: function() {
    return expected;
  }
});

assert(compareArray(Object.keys(proxy), expected));
