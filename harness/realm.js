/**
 * Realm API
 *
 * https://github.com/FUDCo/proposal-frozen-realms
 */
(function(global) {
  var createGlobal = function() {

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
  };
  function define(global) {
    global.$ = {
      global: global,
      createRealm: function() {
        return define(createGlobal());
      },
      evalScript: global.eval
    };
    return global.$;
  }
  define(global);
}(this));
