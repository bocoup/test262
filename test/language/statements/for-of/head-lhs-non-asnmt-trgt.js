// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: Head's LeftHandSideExpression must be a simple assignment target
info: >
    It is a Syntax Error if IsValidSimpleAssignmentTarget of
    LeftHandSideExpression is false.
id: sec-for-in-and-for-of-statements-static-semantics-early-errors
es6id: 13.7
negative: SyntaxError
---*/

for (this of []) {}
