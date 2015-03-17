// Copyright (C) 2013 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
  description: >
      Array instances should be able to be traversed using a `for...of` loop.
  es6id: 14.4
 ---*/

// Yield statements.
function* g() { yield 3; yield 4; }

// Yield expressions.
function* g() { (yield 3) + (yield 4); }

// Yield without a RHS.
function* g() { yield; }
function* g() { yield }
function* g() {
  yield
}
function* g() { (yield) }
function* g() { [yield] }
function* g() { {yield} }
function* g() { yield, yield }
function* g() { yield; yield }
function* g() { (yield) ? yield : yield }
function* g() {
  (yield)
  ? yield
  : yield
}

// If yield has a RHS, it needs to start on the same line.  The * in a
// yield* counts as starting the RHS.
function* g() {
  yield *
  foo
}
assert.throws(SyntaxError, "function* g() { yield\n* foo }");
assert.sameValue(undefined,
             (function*(){
               yield
               3
             })().next().value);

// A YieldExpression is not a LogicalORExpression.
assert.throws(SyntaxError, "function* g() { yield ? yield : yield }");

// You can have a generator in strict mode.
function* g() { "use strict"; yield 3; yield 4; }

// Generators can have return statements also, which internally parse to a kind
// of yield expression.
function* g() { yield 1; return; }
function* g() { yield 1; return 2; }
function* g() { yield 1; return 2; yield "dead"; }

// Generator expression.
(function* () { yield 3; });

// Named generator expression.
(function* g() { yield 3; });

// You can have a generator without a yield.
function* g() { }

// A YieldExpression is valid as the RHS of a YieldExpression.
function* g() { yield yield 1; }
function* g() { yield 3 + (yield 4); }

// Generator definitions with a name of "yield" are not specifically ruled out
// by the spec, as the `yield' name is outside the generator itself.  However,
// in strict-mode, "yield" is an invalid identifier.
function* yield() { (yield 3) + (yield 4); }
assert.throws(SyntaxError,
  "function* yield() { \"use strict\"; (yield 3) + (yield 4); }"
);

// In sloppy mode, yield is a normal identifier, outside of generators.
function yield(yield) { yield: yield (yield + yield (0)); }

// Yield is only a keyword in the body of the generator, not in nested
// functions.
function* g() { function f() { yield (yield + yield (0)); } }

// Yield in a generator is not an identifier.
assert.throws(SyntaxError, "function* g() { yield = 10; }");

// Yield binds very loosely, so this parses as "yield (3 + yield 4)", which is
// invalid.
assert.throws(SyntaxError, "function* g() { yield 3 + yield 4; }");

// Yield is still a future-reserved-word in strict mode
assert.throws(SyntaxError, "function f() { \"use strict\"; var yield = 13; }");

// The name of the NFE is let-bound in G, so is invalid.
assert.throws(SyntaxError, "function* g() { yield (function yield() {}); }");

// In generators, yield is invalid as a formal argument name.
assert.throws(SytaxError, "function* g(yield) { yield (10); }");
