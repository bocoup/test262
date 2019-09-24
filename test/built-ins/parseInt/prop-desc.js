// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-parseint-string-radix
description: Property descriptor for parseInt
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "parseInt");
verifyWritable(this, "parseInt");
verifyConfigurable(this, "parseInt");
