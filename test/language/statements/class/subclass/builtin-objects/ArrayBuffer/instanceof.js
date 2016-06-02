// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es6id: 24.1.2
description: Instance of subclass and built-in using explicit super()
---*/

class Subclass extends ArrayBuffer {
  constructor() {
    super();
  }
}

var sub = new Subclass(1);

assert(sub instanceof ArrayBuffer, "instanceof ArrayBuffer");
assert(sub instanceof Subclass, "instanceof Subclass");
