// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-regular-expressions-patterns
es6id: B1.4
description: Support for UnicodeIDContinue in IdentityEscape
info: >
    IdentityEscape[U] ::
        [+U]SyntaxCharacter
        [+U]/
        [~U]SourceCharacter but not c
---*/

var match;

match = /\C/.exec('ABCDE');
assert.sameValue(match[0], 'C');

match = /O\PQ/.exec('MNOPQRS')
assert.sameValue(match[0], 'OPQ');
