// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: >
    AssertClause in ImportDeclaration may contain a trailing comma
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
flags: [module, import-assertions]
---*/

import x from './eval-gtbndng-indirect-assertion_FIXTURE.js' assert {test262:'',};

assert.sameValue(x, 1);
