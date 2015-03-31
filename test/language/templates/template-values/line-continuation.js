// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TRV of LineContinuation :: \ LineTerminatorSequence is the sequence
    consisting of the code unit value 0x005C followed by the code units of TRV
    of LineTerminatorSequence.
---*/
var calls;

calls = 0;
(function(cs) {
  calls++;
  assert.sameValue(cs.raw[0], '\u005C\n\u005C\n\u005C\n');
})`\
\
\`
assert.sameValue(calls, 1);
