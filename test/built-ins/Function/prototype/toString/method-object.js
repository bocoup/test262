// Copyright (C) 2016 Michael Ficarra. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: pending
description: Function.prototype.toString on a method (object)
---*/

let f = { /* before */f /* a */ ( /* b */ ) /* c */ { /* d */ }/* after */ }.f;

assert.sameValue(f.toString(), "f /* a */ ( /* b */ ) /* c */ { /* d */ }");
