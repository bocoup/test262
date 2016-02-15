// Copyright (C) 2016 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Rick Waldron
id: sec-unary-operators
description: >
  ExponentiationExpression :
    UnaryExpression
    ...

  UnaryExpression :
    ...
    `typeof` UnaryExpression
    ...

negative: SyntaxError
---*/
typeof 1 ** 2;
