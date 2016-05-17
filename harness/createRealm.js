function $CREATEREALM() {

  // SpiderMonkey and ES6Draft
  if (typeof newGlobal === 'function') {
    return newGlobal();
  }

  // V8
  if (typeof Realm !== 'undefined') {
    var realmId = Realm.create();
    if (typeof Realm.makeSameOrigin === 'function') {
      Realm.makeSameOrigin(realmId);
      return Realm.eval(realmId, 'this');
    }
    return Realm.eval(
      realmId,
      // V8 prevents direct access to realm globals, so property access must be
      // facilitated with a Proxy
      '(function(g) {' +
      '  return new Proxy({}, {' +
      '    set(_, p, v) {' +
      '      return Reflect.set(g, p, v);' +
      '    },' +
      '    get(_, x) {' +
      '      return g[x];' +
      '    }'+
      '  });' +
      '}(this));'
    );
  }

  throw new Test262Error('No realm creation API defined.');
}
