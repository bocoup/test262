// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TV of TemplateMiddle :: } TemplateCharacters ${ is the TV of
    TemplateCharacters.
---*/

var calls = 0;
(function(s) {
  calls++;
  assert.sameValue(s[1], 'foo', 'Template value');
})`${1}foo${2}`;
assert.sameValue(calls, 1);
