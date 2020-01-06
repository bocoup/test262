// Copyright (C) 2020 Mike Pennisi. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-let-and-const-declarations
description: >
  The BindingList of a ConstDeclaraction may not end with a comma (final
  binding does not include an initializer)
negative:
  phase: parse
  type: SyntaxError
---*/

$DONOTEVALUATE();

const x = null,
