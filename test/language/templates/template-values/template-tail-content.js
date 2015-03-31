// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TV of TemplateTail :: } TemplateCharacters ` is the TV of
    TemplateCharacters.
---*/

var calls = 0;
(function(s) {
  calls++;
  assert.sameValue(s[1], "foo");
})`${1}foo`;
assert.sameValue(calls, 1);
