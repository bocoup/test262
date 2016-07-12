// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: >
    The production CharacterClassEscape :: w evaluates by returning the set of characters containing the sixty-three characters:
    a - z, A - Z, 0 - 9, _
es5id: 15.10.2.12_A3_T1
description: A - Z
includes: [compareArray.js]
---*/

var chars;
var r = /\w+/g;

chars = '0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
assert(compareArray(chars.match(r)[0], chars), chars);

chars = '12_3a_bc!_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), '!');

chars = '12_3a_bc@_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), '@');

chars = '12_3a_bc _azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), 'space');

chars = '12_3a_bc _azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), 'space');

chars = '12_3a_bcç_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), 'ç');

chars = '12_3a_bcÇ_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), 'Ç');

chars = '12_3a_bcã_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), 'ã');

chars = '12_3a_bcÃ_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), 'Ã');

chars = '12_3a_bc\uD83D\uDCA9_azAB___00_';
assert(compareArray(chars.match(r), ['12_3a_bc', '_azAB___00_']), '\uD83D\uDCA9');
