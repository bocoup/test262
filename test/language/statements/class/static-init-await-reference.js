// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-identifiers
description: The restriction on `await` as a IdentifierReference does not cross function boundaries
info: |
  IdentifierReference : Identifier

  - It is a Syntax Error if the code matched by this production is nested,
    directly or indirectly (but not crossing function or static initialization
    block boundaries), within a ClassStaticBlock and the StringValue of
    Identifier is "arguments" or "await".
features: [class-static-block]
---*/

var await = 0;
var fromFnParam, fromFnBody;
var fromGenParam, fromGenBody;
var fromConstructorParam, fromConstructorBody;
var fromArrowParam, fromArrowBody;
var fromMethodParam, fromMethodBody;
var fromGenMethodParam, fromGenMethodBody;
var fromAccessorParam, fromAccessorBody;

class C {
  static {
    (function (x = fromFnParam = await) {
      fromFnBody = await;
    });

    (function * await (x = fromGenParam = await) {
      fromGenBody = await;
    })().next();

    new (class {
      constructor(x = fromConstructorParam = await) {
        fromConstructorBody = await;
      }
    });

    ((x = fromArrowParam = await) => {
      fromArrowBody = await;
    })();

    ({
      method(x = fromMethodParam = await) {
        fromMethodBody = await;
      }
    }).method();

    ({
      *method(x = fromGenMethodParam = await) {
        fromGenMethodBody = await;
      }
    }).method().next();

    ({
      set accessor(x = fromAccessorParam = await) {
        fromAccessorBody = await;
      }
    }).accessor = undefined;
  }
}

assert.sameValue(fromFnParam, 0, 'from function parameter');
assert.sameValue(fromFnBody, 0, 'from function body');
assert.sameValue(fromGenParam, 0, 'from generator parameter');
assert.sameValue(fromGenBody, 0, 'from generator body');
assert.sameValue(fromConstructorParam, 0, 'from constructor parameter');
assert.sameValue(fromConstructorBody, 0, 'from constructor body');
assert.sameValue(fromArrowParam, 0, 'from arrow parameter');
assert.sameValue(fromArrowBody, 0, 'from arrow body');
assert.sameValue(fromMethodParam, 0, 'from method parameter');
assert.sameValue(fromMethodBody, 0, 'from method body');
assert.sameValue(fromGenMethodParam, 0, 'from generator method parameter');
assert.sameValue(fromGenMethodBody, 0, 'from generator method body');
assert.sameValue(fromAccessorParam, 0, 'from accessor parameter');
assert.sameValue(fromAccessorBody, 0, 'from accessor body');
