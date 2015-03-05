// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    In an object, duplicate computed property getter names produce only a single property of
    that name, whose value is the value of the last property of that name.
---*/
var object = {
  get ['a']() {
    return 'A';
  }
};
assert.sameValue(object.a, 'A', "The value of `object.a` is `'A'`");

object = {
  get b() {
    assert(false, "`false` is `true`");
  },
  get ['b']() {
    return 'B';
  }
};
assert.sameValue(object.b, 'B', "The value of `object.b` is `'B'`");

object = {
  get c() {
    assert(false, "`false` is `true`");
  },
  get ['c']() {
    assert(false, "`false` is `true`");
  },
  get ['c']() {
    return 'C';
  }
};
assert.sameValue(object.c, 'C', "The value of `object.c` is `'C'`");

object = {
  get ['d']() {
    assert(false, "`false` is `true`");
  },
  get d() {
    return 'D';
  }
};
assert.sameValue(object.d, 'D', "The value of `object.d` is `'D'`");
