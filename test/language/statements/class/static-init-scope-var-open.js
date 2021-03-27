// Copyright (C) 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-runtime-semantics-classstaticblockdefinitionevaluation
description: Creation of new variable environment
info: |
  ClassStaticBlock : static { ClassStaticBlockBody }

    1. Let lex be the running execution context's LexicalEnvironment.
    2. Let privateScope be the running execution context's PrivateEnvironment.
    3. Let body be OrdinaryFunctionCreate(Method, « », ClassStaticBlockBody, lex, privateScope).
features: [class-static-block]
---*/

var probe, probe2;

var test262 = 1;

class C {
  static {
    var test262 = 2;
    probe = function() {
      return test262;
    };
  }

  static {
    var test262 = 3;
  }
}

new C();

assert.sameValue(test262, 1, 'inner environments are distinct from outer');
assert.sameValue(probe(), 2, 'inner environments are distinct from each other');
