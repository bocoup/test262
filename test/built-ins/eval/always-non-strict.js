// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Strictness of direct eval is not dependent on strictness of caller
esid: sec-eval-x
info: |
    [...]
    3. Return ? PerformEval(x, evalRealm, false, false). 

    18.2.1.1 Runtime Semantics: PerformEval

    [...]
    6. If strictCaller is true, let strictEval be true.
    7. Else, let strictEval be IsStrict of script.
    [...]
flags: [onlyStrict]
---*/

var count = 0;

(0,eval)('var static; count += 1;');

assert.sameValue(count, 1);

(0,eval)('with ({}) {} count += 1;');

assert.sameValue(count, 2);

(0,eval)('unresolvable = null; count += 1;');

assert.sameValue(count, 3);
