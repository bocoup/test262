// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-regular-expressions-patterns
es6id: B1.4
description: Quantifiable assertions disallowed with `u` flag
info: >
    The `u` flag precludes the use of extended pattern characters irrespective
    of the presence of Annex B extensions.

    Term[U] ::
         [~U] ExtendedAtom
negative: SyntaxError
---*/

/{/u;
