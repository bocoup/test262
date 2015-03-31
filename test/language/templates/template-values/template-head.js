// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TV and TRV of TemplateHead :: `${ is the empty code unit sequence.
    The TV of TemplateHead :: ` TemplateCharacters ${ is the TV of
    TemplateCharacters.
---*/

var calls;

calls = 0;
(function(s) {
  calls++;
  assert.sameValue(s[0], '', 'Template value (empty)');
  assert.sameValue(s.raw[0], '', 'Template raw value (empty)');
})`${1}`;
assert.sameValue(calls, 1);

calls = 0;
(function(s) {
  calls++;
  assert.sameValue(s[0], 'foo', 'Template value (with content)');
})`foo${1}`;
assert.sameValue(calls, 1);
