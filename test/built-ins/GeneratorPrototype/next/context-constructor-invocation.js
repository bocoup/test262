// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 25.2
description: >
    When a generator function is invoked as a constructor, its context is the
    newly-created iterable object.
---*/

var context;
function* g() { context = this; }
var iter = new g();

iter.next();

assert.sameValue(context, iter);
