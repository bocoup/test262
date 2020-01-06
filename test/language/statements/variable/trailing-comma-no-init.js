// Copyright (C) 2020 Mike Pennisi. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-variable-statement
description: >
  The BindingList of a VariableStatement may not end with a comma (final
  binding does not include an initializer)
negative:
  phase: parse
  type: SyntaxError
---*/

$DONOTEVALUATE();

var x,
