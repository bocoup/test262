// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.8
description: >
    Expressions should be evaluated and converted to Stings accordingto the
    ToString abstract operation.
---*/
var number = 5;
var string = 'string';
function fn() { return 'result'; }
var object = {
  number: number,
  string: string,
  fn: function() { return 'result'; }
};

assert.sameValue(`foo ${number} bar`, 'foo 5 bar', 'number value reference');
assert.sameValue(`foo ${string} bar`, 'foo string bar', 'string value reference');
assert.sameValue(`foo ${object} bar`, 'foo [object Object] bar', 'object reference');
assert.sameValue(`foo ${fn()} bar`, 'foo result bar', 'function invocation');
assert.sameValue(`foo ${object.number} bar`, 'foo 5 bar', 'number value property');
assert.sameValue(`foo ${object.string} bar`, 'foo string bar', 'string value property');
assert.sameValue(`foo ${object.fn()} bar`, 'foo result bar', 'method invocation');
assert.sameValue(`foo ${`bar ${number}`}`, 'foo bar 5', 'template expression');
