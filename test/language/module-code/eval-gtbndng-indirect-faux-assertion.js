// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
  AssertClause in ImportDeclaration may not be preceded by a line terminator
esid: sec-modules
info: |
  ImportDeclaration:
    import ModuleSpecifier[no LineTerminator here] AssertClause;

  AssertClause:
    assert {}
    assert {AssertEntries ,opt}

  AssertEntries:
    AssertionKey : StringLiteral
    AssertionKey : StringLiteral , AssertEntries

  AssertionKey:
    IdentifierName
    StringLiteral

  The restriction LineTerminator could be verified more simply with a negative
  syntax test. This test is designed to parse successfully in order to verify
  the restriction more precisely.
features: [import-assertions, globalThis]
flags: [module, raw]
---*/

var callCount = 0;

// Define a property on the global "this" value so that the effect of the
// expected IdentifierReference can be observed.
Object.defineProperty(globalThis, 'assert', {
  get: function() {
    callCount += 1;
  }
});

import x from './import-assertion_FIXTURE.js'
assert
{test262:''};

if (x !== 262) {
  throw 'module value incorrectly imported';
}

if (callCount !== 1) {
  throw 'IdentifierReference not recognized';
}
