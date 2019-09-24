// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-eval-x
description: Property descriptor for eval
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "eval");
verifyWritable(this, "eval");
verifyConfigurable(this, "eval");
