// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-decodeuricomponent-encodeduricomponent
description: Property descriptor for decodeURIComponent
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "decodeURIComponent");
verifyWritable(this, "decodeURIComponent");
verifyConfigurable(this, "decodeURIComponent");
