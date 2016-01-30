// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
description: Statement cannot contain an `import` declaration
esid: sec-modules
negative:
  stage: early
  type: SyntaxError
flags: [module]
---*/

for (var y of [])
  import v from './decl-pos-import-for-of-var.js';
