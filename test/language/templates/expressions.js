// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.8
description: >
    Expressions should be evaluated and converted to Stings accordingto the
    ToString abstract operation.
---*/
var num = 5;
var str = 'str';
function fn() { return 'result'; }
var obj = {
  num: num,
  str: str,
  fn: function() { return 'result'; }
};

assert.sameValue(`foo ${num} bar`, 'foo 5 bar', 'number value reference');
assert.sameValue(`foo ${str} bar`, 'foo str bar', 'string value reference');
assert.sameValue(`foo ${obj} bar`, 'foo [object Object] bar', 'object reference');
assert.sameValue(`foo ${fn()} bar`, 'foo result bar', 'function invocation');
assert.sameValue(`foo ${obj.num} bar`, 'foo 5 bar', 'number value property');
assert.sameValue(`foo ${obj.str} bar`, 'foo str bar', 'string value property');
assert.sameValue(`foo ${obj.fn()} bar`, 'foo result bar', 'method invocation');
assert.sameValue(`foo ${`bar ${num}`}`, 'foo bar 5', 'template expression');
