// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 14.2
description: >
  Default parameter values on arrow functions
---*/

var a = (x = 40, y = 2) => { return x + y };

assert.sameValue(a(), 42);
