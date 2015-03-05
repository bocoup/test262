// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.5
description: >
    computed property names can be numbers
---*/
var object = {
  [1.2]: 'A',
  [1e55]: 'B',
  [0.000001]: 'C',
  [-0]: 'D',
  [Infinity]: 'E',
  [-Infinity]: 'F',
  [NaN]: 'G',
};
assert.sameValue(object['1.2'], 'A', "The value of `object['1.2']` is `'A'`");
assert.sameValue(object['1e+55'], 'B', "The value of `object['1e+55']` is `'B'`");
assert.sameValue(object['0.000001'], 'C', "The value of `object['0.000001']` is `'C'`");
assert.sameValue(object[0], 'D', "The value of `object[0]` is `'D'`");
assert.sameValue(object[Infinity], 'E', "The value of `object[Infinity]` is `'E'`");
assert.sameValue(object[-Infinity], 'F', "The value of `object[-Infinity]` is `'F'`");
assert.sameValue(object[NaN], 'G', "The value of `object[NaN]` is `'G'`");
