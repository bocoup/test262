// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 24.1.2
description: Subclassing the ArrayBuffer object
info: >
  24.1.2 The ArrayBuffer Constructor

  ...

  The ArrayBuffer constructor is designed to be subclassable. It may be used as
  the value of an extends clause of a class definition. Subclass constructors
  that intend to inherit the specified ArrayBuffer behaviour must include a
  super call to the ArrayBuffer constructor to create and initialize subclass
  instances with the internal state necessary to support the
  ArrayBuffer.prototype built-in methods.
---*/

class AB extends ArrayBuffer {}

var ab = new AB(4);

assert(ab instanceof AB, "ab instanceof AB");
assert(ab instanceof ArrayBuffer, "ab instanceof ArrayBuffer");

var sliced = ab.slice(0, 1);

assert(sliced instanceof AB, "sliced instanceof AB");
assert(sliced instanceof ArrayBuffer, "sliced instanceof ArrayBuffer");
