// Copyright (C) Copyright 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 
description: >
includes: [compareArray.js]
---*/
function f() { }
function* g() { yield 1; }
var GeneratorFunctionPrototype = Object.getPrototypeOf(g);
var GeneratorFunction = GeneratorFunctionPrototype.constructor;
var GeneratorObjectPrototype = GeneratorFunctionPrototype.prototype;

// A generator function should have the same set of properties as any
// other function.
function TestGeneratorFunctionInstance() {
  var f_own_property_names = Object.getOwnPropertyNames(f);
  var g_own_property_names = Object.getOwnPropertyNames(g);

  f_own_property_names.sort();
  g_own_property_names.sort();

  assert(compareArray(f_own_property_names, g_own_property_names));
  var i;
  for (i = 0; i < f_own_property_names.length; i++) {
    var prop = f_own_property_names[i];
    var f_desc = Object.getOwnPropertyDescriptor(f, prop);
    var g_desc = Object.getOwnPropertyDescriptor(g, prop);
    assert.sameValue(f_desc.configurable, g_desc.configurable, prop);
    if (prop === 'arguments' || prop === 'caller') {
      // Unlike sloppy functions, which have read-only data arguments and caller
      // properties, sloppy generators have a poison pill implemented via
      // accessors
      assert.sameValue('writable' in g_desc, false, prop);
      assert.sameValue(g_desc.get instanceof Function, true, prop);
      assert.sameValue(g_desc.get, g_desc.set, prop);
    } else {
      assert.sameValue(f_desc.writable, g_desc.writable, prop);
    }
    assert.sameValue(f_desc.enumerable, g_desc.enumerable, prop);
  }
}
TestGeneratorFunctionInstance();


// Generators have an additional object interposed in the chain between
// themselves and Function.prototype.
function TestGeneratorFunctionPrototype() {
  // Sanity check.
  assert.sameValue(Function.prototype, Object.getPrototypeOf(f));
  assert.sameValue(GeneratorFunctionPrototype === Function.prototype, false);
  assert.sameValue(Object.getPrototypeOf(GeneratorFunctionPrototype),
             Function.prototype);
  assert.sameValue(Object.getPrototypeOf(function* () {}),
             GeneratorFunctionPrototype);
}
TestGeneratorFunctionPrototype();


// Functions that we associate with generator objects are actually defined by
// a common prototype.
function TestGeneratorObjectPrototype() {
  assert.sameValue(Object.getPrototypeOf(GeneratorObjectPrototype),
             Object.prototype);
  assert.sameValue(Object.getPrototypeOf((function*(){yield 1}).prototype),
             GeneratorObjectPrototype);

  var expected_property_names = ["next", "throw", "constructor"];
  var found_property_names =
      Object.getOwnPropertyNames(GeneratorObjectPrototype);

  expected_property_names.sort();
  found_property_names.sort();

  assert(compareArray(expected_property_names, found_property_names));

  iterator_desc = Object.getOwnPropertyDescriptor(GeneratorObjectPrototype,
      Symbol.iterator);
  assert.sameValue(iterator_desc !== undefined, true);
  assert.sameValue(iterator_desc.writable, false);
  assert.sameValue(iterator_desc.enumerable, false);
  assert.sameValue(iterator_desc.configurable, false);

  // The generator object's "iterator" function is just the identity.
  assert.sameValue(42, iterator_desc.value.call(42));
}
TestGeneratorObjectPrototype();


// This tests the object that would be called "GeneratorFunction", if it were
// like "Function".
function TestGeneratorFunction() {
  assert.sameValue(GeneratorFunction.prototype, GeneratorFunctionPrototype);
  assert.sameValue(g instanceof GeneratorFunction, true);

  assert.sameValue(Object.getPrototypeOf(GeneratorFunction), Function);
  assert.sameValue(g instanceof Function, true);

  assert.sameValue(g.toString(), "function* g() { yield 1; }");

  // Not all functions are generators.
  assert.sameValue(f instanceof Function, true);  // Sanity check.
  assert.sameValue(!(f instanceof GeneratorFunction), true);

  assert.sameValue((new GeneratorFunction()) instanceof GeneratorFunction, true);
  assert.sameValue(GeneratorFunction() instanceof GeneratorFunction, true);
}
TestGeneratorFunction();


function TestPerGeneratorPrototype() {
  assert.sameValue((function*(){}).prototype !== (function*(){}).prototype, true);
  assert.sameValue((function*(){}).prototype !== g.prototype, true);
  assert.sameValue(g.prototype instanceof GeneratorFunctionPrototype, true);
  assert.sameValue(Object.getPrototypeOf(g.prototype), GeneratorObjectPrototype);
  assert.sameValue(!(g.prototype instanceof Function), true);
  assert.sameValue("object", typeof (g.prototype));

  assert(compareArray([], Object.getOwnPropertyNames(g.prototype)));
}
TestPerGeneratorPrototype();
