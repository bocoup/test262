// Copyright 2019 Ron Buckton. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Basic matching cases with non-unicode matches.
includes: [compareArray.js, propertyHelper.js]
esid: sec-regexpbuiltinexec
features: [regexp-match-indices]
info: |
  Runtime Semantics: RegExpBuiltinExec ( R, S )
    ...
    4. Let _lastIndex_ be ? ToLength(? Get(_R_, `"lastIndex")).
    ...
    8. If _flags_ contains `"d"`, let _hasIndices_ be *true*, else let _hasIndices_ be *false*.
    ...
    26. Let _match_ be the Match { [[StartIndex]]: _lastIndex_, [[EndIndex]]: _e_ }.
    27. Let _indices_ be a new empty List.
    29. Add _match_ as the last element of _indices_.
    ...
    35. For each integer _i_ such that _i_ > 0 and _i_ <= _n_, in ascending order, do
      ...
      f. Else,
        i. Let _captureStart_ be _captureI_'s _startIndex_.
        ii. Let _captureEnd_ be _captureI_'s _endIndex_.
        ...
        iv. Let _capture_ be the Match  { [[StartIndex]]: _captureStart_, [[EndIndex]]: _captureEnd_ }.
        v. Append _capture_ to _indices_.
        ...
    36. If _hasIndices_ is *true*, then
      a. Let _indicesArray_ be MakeIndicesArray( _S_, _indices_, _groupNames_).
      b. Perform ! CreateDataProperty(_A_, `"indices"`, _indicesArray_).
---*/

function spread(indices) {
  if (indices.length === 2) {
    return indices[0].concat("x").concat(indices[1]);
  } else if (indices.length === 3) {
    return indices[0].concat("x").concat(indices[1]).concat("x").concat(indices[2]);
  }
}

assert.compareArray([1, 2, "x", 1, 2], spread("bab".match(/(a)/d).indices));
assert.compareArray([0, 3, "x", 1, 2], spread("bab".match(/.(a)./d).indices));
assert.compareArray([0, 3, "x", 1, 2, "x", 2, 3], spread("bab".match(/.(a)(.)/d).indices));
assert.compareArray([0, 3, "x", 1, 3], spread("bab".match(/.(\w\w)/d).indices));
assert.compareArray([0, 3, "x", 0, 3], spread("bab".match(/(\w\w\w)/d).indices));
assert.compareArray([0, 3, "x", 0, 2, "x", 2, 3], spread("bab".match(/(\w\w)(\w)/d).indices));
assert.compareArray([0, 2, "x", 0, 2, "x", undefined], spread("bab".match(/(\w\w)(\W)?/d).indices));

let groups = /(?<a>.)(?<b>.)(?<c>.)\k<c>\k<b>\k<a>/d.exec("abccba").indices.groups;
assert.compareArray([0, 1], groups.a);
assert.compareArray([1, 2], groups.b);
assert.compareArray([2, 3], groups.c);
verifyProperty(groups, "a", {
    enumerable: true,
    writable: true,
    configurable: true
});
verifyProperty(groups, "b", {
    enumerable: true,
    writable: true,
    configurable: true
});
verifyProperty(groups, "c", {
    enumerable: true,
    writable: true,
    configurable: true
});

// "𝐁" is U+1d401 MATHEMATICAL BOLD CAPITAL B
// - Also representable as the code point "\u{1d401}"
// - Also representable as the surrogate pair "\uD835\uDC01"

// Verify assumptions:
assert.sameValue("𝐁".length, 2, 'The length of "𝐁" is 2');
assert.sameValue("\u{1d401}".length, 2, 'The length of "\\u{1d401}" is 2');
assert.sameValue("\uD835\uDC01".length, 2, 'The length of "\\uD835\\uDC01" is 2');
assert.sameValue("𝐁".match(/./)[0].length, 1, 'The length of a single code unit match against "𝐁" is 1 (without /u flag)');
assert.sameValue("\u{1d401}".match(/./)[0].length, 1, 'The length of a single code unit match against "\\u{1d401}" is 1 (without /u flag)');
assert.sameValue("\uD835\uDC01".match(/./)[0].length, 1, 'The length of a single code unit match against "\\ud835\\udc01" is 1 (without /u flag)');

assert.compareArray([0, 1], "𝐁".match(/./d).indices[0], 'Indices for non-unicode match against "𝐁" (without /u flag)');
assert.compareArray([0, 1], "\u{1d401}".match(/./d).indices[0], 'Indices for non-unicode match against "\\u{1d401}" (without /u flag)');
assert.compareArray([0, 1], "\uD835\uDC01".match(/./d).indices[0], 'Indices for non-unicode match against "\\ud835\\udc01" (without /u flag)');
assert.compareArray([0, 1], "𝐁".match(/(?<a>.)/d).indices.groups.a, 'Indices for non-unicode match against "𝐁" in groups.a (without /u flag)');
assert.compareArray([0, 1], "\u{1d401}".match(/(?<a>.)/d).indices.groups.a, 'Indices for non-unicode match against "\\u{1d401}" in groups.a (without /u flag)');
assert.compareArray([0, 1], "\uD835\uDC01".match(/(?<a>.)/d).indices.groups.a, 'Indices for non-unicode match against "\\ud835\\udc01" in groups.a (without /u flag)');
