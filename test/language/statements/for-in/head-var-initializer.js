// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-for-in-and-for-of-statements
es6id: 13.7.5
description: Initializer is not permitted in VariableDeclaration
info: >
  Prior to ECMAScript 2015, an initialization expression could appear as part
  of the VariableDeclaration that precedes the in keyword. The value of that
  expression was always discarded. In ECMAScript 2015, the ForBinding in that
  same position does not allow the occurrence of such an initializer.
negative: SyntaxError
---*/

for (var x = 0 in {}) {}
