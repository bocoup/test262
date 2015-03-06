// Flags: --allow-natives-syntax --harmony-tostring

// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 
description: >
includes: [compareArray.js]
---*/
(function TestSetIterator() {
  var s = new Set;
  var iter = s.values();
  //assertEquals('Set Iterator', %_ClassOf(iter));

  var SetIteratorPrototype = Object.getPrototypeOf(iter);
  assert.sameValue(SetIteratorPrototype.hasOwnProperty('constructor'), false);
  assert.sameValue(Object.getPrototypeOf(SetIteratorPrototype), Object.prototype);

  var propertyNames = Object.getOwnPropertyNames(SetIteratorPrototype);
  assert(compareArray(['next'], propertyNames));

  assert.sameValue(Object.getPrototypeOf(new Set().values()), SetIteratorPrototype);
  assert.sameValue(Object.getPrototypeOf(new Set().entries()), SetIteratorPrototype);

  assert.sameValue(Object.prototype.toString.call(iter),
      "[object Set Iterator]");
  assert.sameValue(SetIteratorPrototype[Symbol.toStringTag], "Set Iterator");
  var desc = Object.getOwnPropertyDescriptor(
      SetIteratorPrototype, Symbol.toStringTag);
  assert.sameValue(desc.configurable, true);
  assert.sameValue(desc.writable, false);
  assert.sameValue(desc.value, "Set Iterator");
})();


(function TestSetIteratorValues() {
  var s = new Set;
  s.add(1);
  s.add(2);
  s.add(3);
  var iter = s.values();
  var result;

  result = iter.next();
  assert.sameValue(result.value, 1);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, 3);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);
})();


(function TestSetIteratorKeys() {
  assert.sameValue(Set.prototype.keys, Set.prototype.values);
})();


(function TestSetIteratorEntries() {
  var s = new Set;
  s.add(1);
  s.add(2);
  s.add(3);
  var iter = s.entries();
  var result;

  result = iter.next();
  assert.sameValue(result.value[0], 1);
  assert.sameValue(result.value[1], 1);
  assert.sameValue(result.value.length, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value[0], 2);
  assert.sameValue(result.value[1], 2);
  assert.sameValue(result.value.length, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value[0], 3);
  assert.sameValue(result.value[1], 3);
  assert.sameValue(result.value.length, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);
})();


(function TestSetIteratorMutations() {
  var s = new Set;
  s.add(1);
  var iter = s.values();
  var result;

  result = iter.next();
  assert.sameValue(result.value, 1);
  assert.sameValue(result.done, false);

  s.add(2);
  s.add(3);
  s.add(4);
  s.add(5);

  result = iter.next();
  assert.sameValue(result.value, 2);
  assert.sameValue(result.done, false);

  s.delete(3);
  result = iter.next();
  assert.sameValue(result.value, 4);
  assert.sameValue(result.done, false);

  s.delete(5);
  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);

  s.add(4);
  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);
})();


(function TestSetInvalidReceiver() {
  assert.throws(TypeError, function() {
    Set.prototype.values.call({});
  });
  assert.throws(TypeError, function() {
    Set.prototype.entries.call({});
  });
})();


(function TestSetIteratorInvalidReceiver() {
  var iter = new Set().values();
  assert.throws(TypeError, function() {
    iter.next.call({});
  });
})();


(function TestSetIteratorSymbol() {
  assert.sameValue(Set.prototype[Symbol.iterator], Set.prototype.values);
  assert.sameValue(Set.prototype.hasOwnProperty(Symbol.iterator), true);
  assert.sameValue(Set.prototype.propertyIsEnumerable(Symbol.iterator), false);

  var iter = new Set().values();
  assert.sameValue(iter, iter[Symbol.iterator]());
  assert.sameValue(iter[Symbol.iterator].name, '[Symbol.iterator]');
})();


(function TestMapIterator() {
  var m = new Map;
  var iter = m.values();
  //assertEquals('Map Iterator', %_ClassOf(iter));

  var MapIteratorPrototype = Object.getPrototypeOf(iter);
  assert.sameValue(MapIteratorPrototype.hasOwnProperty('constructor'), false);
  assert.sameValue(Object.getPrototypeOf(MapIteratorPrototype), Object.prototype);

  var propertyNames = Object.getOwnPropertyNames(MapIteratorPrototype);
  assert(compareArray(['next'], propertyNames));

  assert.sameValue(Object.getPrototypeOf(new Map().values()), MapIteratorPrototype);
  assert.sameValue(Object.getPrototypeOf(new Map().keys()), MapIteratorPrototype);
  assert.sameValue(Object.getPrototypeOf(new Map().entries()), MapIteratorPrototype);

  assert.sameValue(Object.prototype.toString.call(iter),
      "[object Map Iterator]");
  assert.sameValue(MapIteratorPrototype[Symbol.toStringTag], "Map Iterator");
  var desc = Object.getOwnPropertyDescriptor(
      MapIteratorPrototype, Symbol.toStringTag);
  assert.sameValue(desc.configurable, true);
  assert.sameValue(desc.writable, false);
  assert.sameValue(desc.value, "Map Iterator");
})();


(function TestMapIteratorValues() {
  var m = new Map;
  m.set(1, 11);
  m.set(2, 22);
  m.set(3, 33);
  var iter = m.values();
  var result;

  result = iter.next();
  assert.sameValue(result.value, 11);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, 22);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, 33);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);
})();


(function TestMapIteratorKeys() {
  var m = new Map;
  m.set(1, 11);
  m.set(2, 22);
  m.set(3, 33);
  var iter = m.keys();
  var result;

  result = iter.next();
  assert.sameValue(result.value, 1);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, 3);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);

  result = iter.next();
  assert.sameValue(result.value, undefined);
  assert.sameValue(result.done, true);
})();


(function TestMapIteratorEntries() {
  var m = new Map;
  m.set(1, 11);
  m.set(2, 22);
  m.set(3, 33);
  var iter = m.entries();
  var result;

  result = iter.next();
  assert.sameValue(result.value[0], 1);
  assert.sameValue(result.value[1], 11);
  assert.sameValue(result.value.length, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value[0], 2);
  assert.sameValue(result.value[1], 22);
  assert.sameValue(result.value.length, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.value[0], 3);
  assert.sameValue(result.value[1], 33);
  assert.sameValue(result.value.length, 2);
  assert.sameValue(result.done, false);

  result = iter.next();
  assert.sameValue(result.undefined);
  assert.sameValue(result.done, true);

  result = iter.next();
  assert.sameValue(result.undefined);
  assert.sameValue(result.done, true);
})();


(function TestMapInvalidReceiver() {
  assert.throws(TypeError, function() {
    Map.prototype.values.call({});
  });
  assert.throws(TypeError, function() {
    Map.prototype.keys.call({});
  });
  assert.throws(TypeError, function() {
    Map.prototype.entries.call({});
  });
})();


(function TestMapIteratorInvalidReceiver() {
  var iter = new Map().values();
  assert.throws(TypeError, function() {
    iter.next.call({});
  });
})();


(function TestMapIteratorSymbol() {
  assert.sameValue(Map.prototype[Symbol.iterator], Map.prototype.entries);
  assert.sameValue(Map.prototype.hasOwnProperty(Symbol.iterator), true);
  assert.sameValue(Map.prototype.propertyIsEnumerable(Symbol.iterator), false);

  var iter = new Map().values();
  assert.sameValue(iter, iter[Symbol.iterator]());
  assert.sameValue(iter[Symbol.iterator].name, '[Symbol.iterator]');
})();
