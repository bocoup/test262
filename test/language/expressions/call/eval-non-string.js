// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Evaluated code honors the strictness of the calling context
esid: sec-function-calls-runtime-semantics-evaluation
info: |
    [...]
    3. If Type(ref) is Reference and IsPropertyReference(ref) is false and
       GetReferencedName(ref) is "eval", then
       a. If SameValue(func, %eval%) is true, then
          [...]
          vii. Return ? PerformEval(evalText, evalRealm, strictCaller, true).

    18.2.1. 1Runtime Semantics: PerformEval

    [...]
    2. If Type(x) is not String, return x.
flags: [onlyStrict]
---*/

assert.sameValue(eval(undefined), undefined);
assert.sameValue(eval(null), null);
assert.sameValue(eval(true), true);
assert.sameValue(eval(false), false);
assert.sameValue(eval(23), 23);
assert.sameValue(eval(NaN), NaN);

var obj = {};
assert.sameValue(eval(obj), obj);

var arr = [];
assert.sameValue(eval(arr), arr);
