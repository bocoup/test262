// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-Intl.DisplayNames.prototype.of
description: Abrupt completion when coercing `code` parameter to string
info: |
  Intl.DisplayNames.prototype.of ()

  1. Let displayNames be this value.
  2. Perform ? RequireInternalSlot(displayNames, [[InitializedDisplayNames]]).
  3. Let code be ? ToString(code).
  ...
features: [Intl.DisplayNames]
---*/

var dn = new Intl.DisplayName([], {type:'language'});

assert.throws(Test262Error, function() {
  dn.of(code);
});

