// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-encodeuri-uri
description: Property descriptor for encodeURI
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "encodeURI");
verifyWritable(this, "encodeURI");
verifyConfigurable(this, "encodeURI");
