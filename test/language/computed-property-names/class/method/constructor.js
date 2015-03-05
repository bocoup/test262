// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    computed property names can be "constructor"
---*/
class C {
  ['constructor']() {
    return 1;
  }
}
assert(
  C !== C.prototype.constructor,
  "The result of `C !== C.prototype.constructor` is `true`"
);
assert.sameValue(new C().constructor(), 1, "`new C().constructor()` returns `1`");

class C2 {
  get ['constructor']() {
    return 2;
  }
}
assert.sameValue(new C2().constructor, 2, "The value of `new C2().constructor` is `2`");

var calls = 0;
class C3 {
  set ['constructor'](x) {
    assert.sameValue(x, 3, "The value of `x` is `3`");
    calls++;
  }
}
new C3().constructor = 3;
assert.sameValue(calls, 1, "The value of `calls` is `1`");

class C4 {
  *['constructor']() {
    yield 1;
    yield 2;
  }
}

assert(
  C4 !== C4.prototype.constructor,
  "The result of `C4 !== C4.prototype.constructor` is `true`"
);
assert.sameValue(new C().constructor(), 1, "`new C().constructor()` returns `1`");
