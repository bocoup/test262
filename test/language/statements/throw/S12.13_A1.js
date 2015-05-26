// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: Sanity test for throw statement
es5id: 12.13_A1
description: Trying to throw exception with "throw"
---*/

var error = null;

try {
  throw "expected_message";
} catch(_error) {
  error = _error;
}

assert.sameValue(error, "expected_message");
