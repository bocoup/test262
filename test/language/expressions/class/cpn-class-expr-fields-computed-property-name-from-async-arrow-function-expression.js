// This file was procedurally generated from the following sources:
// - src/computed-property-names/computed-property-name-from-async-arrow-function-expression.case
// - src/computed-property-names/evaluation/class-expression-fields.template
/*---
description: Computed property name from function expression (ComputedPropertyName in ClassExpression)
esid: prod-ComputedPropertyName
features: [computed-property-names]
flags: [generated]
info: |
    ClassExpression:
      classBindingIdentifier opt ClassTail

    ClassTail:
      ClassHeritage opt { ClassBody opt }

    ClassBody:
      ClassElementList

    ClassElementList:
      ClassElement

    ClassElement:
      MethodDefinition

    MethodDefinition:
      PropertyName ...
      get PropertyName ...
      set PropertyName ...

    PropertyName:
      ComputedPropertyName

    ComputedPropertyName:
      [ AssignmentExpression ]
---*/


let C = class {
  [async () => {}] = 1;

  static [async () => {}] = 1;
};

let c = new C();

assert.sameValue(
  c[async () => {}],
  1
);
assert.sameValue(
  C[async () => {}],
  1
);
assert.sameValue(
  c[String(async () => {})],
  1
);
assert.sameValue(
  C[String(async () => {})],
  1
);
