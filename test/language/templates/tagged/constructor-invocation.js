// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.3.7
description: >
    Tagged template application takes precedence over `new` invocation.
---*/

function Constructor() {}
var tag = function(x) {
  templateObject = x;
  return Constructor;
};
var instance = new tag`test`;
var templateObject;

assert(instance instanceof Constructor);
assert.sameValue(templateObject[0], 'test');
