// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-decodeuri-encodeduri
description: >
  Property descriptor for decodeURI
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "decodeURI");
verifyWritable(this, "decodeURI");
verifyConfigurable(this, "decodeURI");
