// Copyright (c) 2016 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-variable-statement-runtime-semantics-evaluation
es6id: 13.3.2.4
description: Reference is created prior to evaluation of AssignmentExpression
info: |
  VariableDeclaration : BindingIdentifier Initializer

  1. Let bindingId be StringValue of BindingIdentifier.
  2. Let lhs be ? ResolveBinding(bindingId).
  3. Let rhs be the result of evaluating Initializer.
  4. Let value be ? GetValue(rhs).
  5/ If IsAnonymousFunctionDefinition(Initializer) is true, then
     a. Let hasNameProperty be ? HasOwnProperty(value, "name").
     b. If hasNameProperty is false, perform SetFunctionName(value, bindingId).
  6. Return ? PutValue(lhs, value).

  6.2.3.2 PutValue

  [...]
  4. Let base be GetBase(V).
  5. If IsUnresolvableReference(V) is true, then
     [...]
  6. Else if IsPropertyReference(V) is true, then
     [...]
  7. Else base must be an Environment Record,
     a. Return ? base.SetMutableBinding(GetReferencedName(V), W,
        IsStrictReference(V)) (see 8.1.1).

  8.1.1.2.5 SetMutableBinding

  1. Let envRec be the object Environment Record for which the method was
     invoked.
  2. Let bindings be the binding object for envRec.
  3. If D is true, let configValue be true; otherwise let configValue be false.
  4. Return ? DefinePropertyOrThrow(bindings, N, PropertyDescriptor{[[Value]]:
     undefined, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]:
     configValue}).
flags: [noStrict]
includes: [propertyHelper.js]
---*/

var objRecord = { a: false };

with (objRecord) {
  var a = delete objRecord.a;
}

assert.sameValue(objRecord.a, true);
verifyEnumerable(objRecord, "a");
verifyWritable(objRecord, "a");
verifyConfigurable(objRecord, "a");
