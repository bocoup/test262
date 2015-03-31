// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TV and TRV of TemplateMiddle :: }${ is the empty code unit sequence.
---*/

var calls = 0;
(function(s) {
  calls++;
  assert.sameValue(s[1], '', 'Template value');
  assert.sameValue(s.raw[1], '', 'Template raw value');
})`${1}${2}`;
assert.sameValue(calls, 1);
