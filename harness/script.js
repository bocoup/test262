/**
 * $.evalScript
 *
 * The method `evalScript` with argument sourceText performs the following
 * steps:
 *
 * 1. Let hostDefined be any host-defined values for the provided sourceText
 *    (obtained in an implementation dependent manner)
 * 2. Let realm be the current Realm Record.
 * 2. Let s be ParseScript(sourceText, realm, hostDefined).
 * 3. If s is a List of errors, then
 *    a. Let error be any element of s.
 *    b. Return
 *       Completion{[[Type]]: throw, [[Value]]: error, [[Target]]: empty}.
 * 4. Let status be ScriptEvaluation(s).
 * 5. Return Completion(status).
 */
this.$ = {
  evalScript: function(sourceText) {
    // SpiderMonkey
    if (typeof evaluate === 'function') {
      return evaluate(sourceText);

    // V8
    } else if (typeof Realm === 'object') {
      return Realm.eval(Realm.current(), sourceText);

    // es6draft
    } else if (typeof evalScript === 'function') {
      return evalScript(sourceText);
    }

    throw new Error(
      'Test262: Cannot detect method to evaluate script'
    );
  }
};
