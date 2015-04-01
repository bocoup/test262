// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 12.2.8
description: >
    Previously-created template objects should be retrieved from the internal
    template registry.
---*/
function tag(templateObject) {
  previousObject = templateObject;
}
var a = 1;
var b = 2;
var firstObject = null;
var previousObject = null;

tag`head${a}tail`;
firstObject = previousObject;
assert(firstObject !== null);
previousObject = null;

tag`head${a}tail`;
assert.sameValue(
  previousObject,
  firstObject,
  'The realm\'s template cache is used when tagged templates are declared in the source code directly'
);
previousObject = null;

tag`head${b}tail`;
assert.sameValue(
  previousObject,
  firstObject,
  'The realm\'s template cache is used when tagged templates are declared in the source code directly and templated value differ'
);
previousObject = null;

eval('tag`head${a}tail`');
assert.sameValue(
  previousObject,
  firstObject,
  'The realm\'s template cache is used when tagged templates are declared within "eval" contexts'
);
previousObject = null;

eval('tag`head${b}tail`');
assert.sameValue(
  previousObject,
  firstObject,
  'The realm\'s template cache is used when tagged templates are declared within "eval" contexts and templated values differ'
);
previousObject = null;

(new Function('tag', 'a', 'b', 'return tag`head${b}tail`;'))(tag, 1, 2);
assert.sameValue(
  previousObject,
  firstObject,
  'The realm\'s template cache is referenced when tagged templates are declared within "new Function" contexts'
);
previousObject = null;

(new Function('tag', 'a', 'b', 'return tag`head${b}tail`;'))(tag, 1, 2);
assert.sameValue(
  previousObject,
  firstObject,
  'The realm\'s template cache is referenced when tagged templates are declared within "new Function" contexts and templated values differ'
);
previousObject = null;
