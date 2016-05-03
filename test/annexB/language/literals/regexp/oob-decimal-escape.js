// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-regular-expressions-patterns
es6id: B1.4
description: Out-of-bounds decimal escapes
info: >
     AtomEscape[U] ::
         [+U] DecimalEscape
         [~U] DecimalEscape but only if the integer value of DecimalEscape is <= _NcapturingParens_
         CharacterClassEscape
         CharacterEscape

     CharacterEscape[U] ::
         ControlEscape
         c ControlLetter
         0 [lookahead ∉ DecimalDigit]
         HexEscapeSequence
         RegExpUnicodeEscapeSequence[?U]
         [~U] LegacyOctalEscapeSequence
         IdentityEscape [?U]

     IdentityEscape[U]::
         [+U] SyntaxCharacter
         [+U] /
         [~U] SourceCharacterbut not c
---*/

var match;

match = /(.)(.)(.)(.)(.)(.)(.)(.)\8/.exec('01234567889');
assert.sameValue(match[0], '123456788');

match = /\8/.exec('7890');
assert.sameValue(match[0], '8');

match = /(.)(.)(.)(.)(.)(.)(.)(.)(.)\9/.exec('012345678990');
assert.sameValue(match[0], '1234567899');

match = /\9/.exec('7890');
assert.sameValue(match[0], '9');
