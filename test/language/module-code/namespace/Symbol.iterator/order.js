// Copyright (C) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-@@iterator
description: Iteration order over exported names
info: >
    Iteration should include all non-ambiguous export names in the order they
    are accumulated by GetExportedNames

    15.2.1.18 Runtime Semantics: GetModuleNamespace

    [...]
    3. If namespace is undefined, then
       a. Let exportedNames be ? module.GetExportedNames(« »).
       b. Let unambiguousNames be a new empty List.
       c. For each name that is an element of exportedNames,
          i. Let resolution be ? module.ResolveExport(name, « », « »).
          ii. If resolution is null, throw a SyntaxError exception.
          iii. If resolution is not "ambiguous", append name to
               unambiguousNames.
       d. Let namespace be ModuleNamespaceCreate(module, unambiguousNames).
    4. Return namespace.

    9.4.6.12 ModuleNamespaceCreate (module, exports)

    [...]
    7. Set M's [[Exports]] internal slot to exports.
    [...]

    26.3.2 [ @@iterator ] ( )

    [...]
    3. Let exports be the value of N's [[Exports]] internal slot.
    4. Return ! CreateListIterator(exports).
flags: [module]
features: [Symbol.iterator]
---*/

import * as ns from './order.js';

var iter = ns[Symbol.iterator]();
var result;

result = iter.next();
assert.sameValue(result.done, false, 'not initially done');
assert.sameValue(result.value, 'local');

result = iter.next();
assert.sameValue(result.value, 'default');
assert.sameValue(result.done, false , 'not done after "local"');

result = iter.next();
assert.sameValue(result.value, 'indirect');
assert.sameValue(result.done, false, 'not done after "default"');

result = iter.next();
assert.sameValue(result.value, 'starLocal');
assert.sameValue(result.done, false), 'not done after "indirect"';

result = iter.next();
assert.sameValue(result.value, 'starIndirect');
assert.sameValue(result.done, false), 'not done after "starLocal"';

result = iter.next();
assert.sameValue(result.done, true, 'done after "starIndirect"';
assert.sameValue(result.value, undefined);

result = iter.next();
assert.sameValue(result.done, true, 'done after exhaustion');
assert.sameValue(result.value, undefined);

export * from './order_.js';

export { local as indirect } from './order.js';

export var local;

export default null;
