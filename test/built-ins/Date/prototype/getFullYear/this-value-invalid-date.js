// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-date.prototype.getfullyear
es6id: 20.3.4.4
description: Return value for invalid date
info: |
  1. Let t be ? thisTimeValue(this value).
  2. If t is NaN, return NaN.
---*/

assert.sameValue(new Date(NaN).getFullYear(), NaN);
