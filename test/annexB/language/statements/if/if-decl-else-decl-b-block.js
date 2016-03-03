// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: B.3.4
esid: sec-functiondeclarations-in-ifstatement-statement-clauses
description: Synthetic block is created for lexical binding
info: >
    The above rules are only applied when parsing code that is not strict mode
    code. If any such code is match by one of these rules subsequent processing
    of that code takes places as if each matching occurrence of
    FunctionDeclaration[?Yield] was the sole StatementListItem of a
    BlockStatement occupying that position in the source code. The semantics of
    such a synthetic BlockStatement includes the web legacy compatibility
    semantics specified in B.3.3.  flags: [noStrict]
flags: [noStrict]
---*/

var previousBlockValue, currentBlockValue;

if (false) function _f() {}
else function f() { previousBlockValue = f; f = 123; currentBlockValue = 123; }

f();

assert.sameValue(
  previousBlockValue,
  f,
  'Block-scoped binding value is function object at execution time'
);
assert.sameValue(currentBlockValue, 123, 'Block-scoped binding is mutable');
assert.sameValue(
  typeof f,
  'function',
  'Block-scoped binding is independent of outer var-scoped binding'
);
