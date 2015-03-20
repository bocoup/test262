// Copyright (C) 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    Generator objects should define a `name` property.
includes: [propertyHelper.js]
es6id: 25.2.4
---*/

function* g() {}

verifyNotEnumerable(g, 'name');
verifyNotWritable(g, 'name');
verifyConfigurable(g, 'name');
