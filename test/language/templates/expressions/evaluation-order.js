// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.8
description: >
    Expressions should be evaluated in left-to-right order.
---*/

var i = 0;

assert.sameValue(`a${ i++ }b${ i++ }c${ i++ }d`, 'a0b1c2d');
