// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-parsefloat-string
description: >
  Property descriptor for parseFloat
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "parseFloat");
verifyWritable(this, "parseFloat");
verifyConfigurable(this, "parseFloat");
