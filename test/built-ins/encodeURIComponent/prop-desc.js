// Copyright (C) 2019 Bocoup. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-encodeuricomponent-uricomponent
description: Property descriptor for encodeURIComponent
includes: [propertyHelper.js]
---*/

verifyNotEnumerable(this, "encodeURIComponent");
verifyWritable(this, "encodeURIComponent");
verifyConfigurable(this, "encodeURIComponent");
