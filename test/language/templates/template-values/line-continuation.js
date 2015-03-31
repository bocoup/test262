// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TV of LineContinuation :: \ LineTerminatorSequence is the empty code
    unit sequence.
---*/

assert.sameValue(`a\
b`, 'ab');
