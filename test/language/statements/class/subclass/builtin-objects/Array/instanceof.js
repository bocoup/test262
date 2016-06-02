// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 22.1.1
description: Instance of subclass and built-in using explicit super()
---*/

class Subclass extends Array {
  constructor() {
    super();
  }
}

var sub = new Subclass();

assert(sub instanceof Array, "instanceof Array");
assert(sub instanceof Subclass, "instanceof Subclass");
