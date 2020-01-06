// Copyright (C) 2020 Mike Pennisi. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-let-and-const-declarations
description: >
  The BindingList of a LetDeclaraction may not end with a comma (final binding
  includes an initializer)
negative:
  phase: parse
  type: SyntaxError
---*/

$DONOTEVALUATE();

let x = null,
