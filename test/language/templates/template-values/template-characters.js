// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 11.8.6
description: >
    The TV of NoSubstitutionTemplate :: ` TemplateCharacters ` is the TV of
    TemplateCharacters.
---*/

var calls;
(function(s) { calls++; assert.sameValue(s[0], "f"); })`f`;
assert.sameValue(
  `f`,
  'f',
  'The TV of TemplateCharacters :: TemplateCharacter is the TV of TemplateCharacter.'
);
