// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Flags: --harmony-unicode

// Copyright (C) Copyright 2014 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
es6id: 
description: >
---*/
var num = 5;
var str = "str";
function fn() { return "result"; }
var obj = {
  num: num,
  str: str,
  fn: function() { return "result"; }
};

(function testTaggedTemplates() {
  var calls = 0;

  // The TRV of TemplateCharacter :: \ EscapeSequence is the sequence consisting
  // of the code unit value 0x005C followed by the code units of TRV of
  // EscapeSequence.

})();


(function testCallSiteCaching() {
  var callSites = [];
  function tag(cs) { callSites.push(cs); }
  var a = 1;
  var b = 2;

  // Functionality covered by other tests:
  callSites = [];

  eval("tag`\\\r\n\\\n\\\r`");
  eval("tag`\\\r\n\\\n\\\r`");
  assert.sameValue(callSites.length, 2);
  assert.sameValue(callSites[1], callSites[0]);
  assert.sameValue(callSites[0][0], "");
  assert.sameValue(callSites[0].raw[0], "\\\n\\\n\\\n");

  // Functionality covered by other tests:
  callSites = [];

  tag`\uc548\ub155`;
  tag`\uc548\ub155`;
  assert.sameValue(callSites.length, 2);
  assert.sameValue(callSites[1], callSites[0]);
  assert.sameValue(callSites[0][0], "안녕");
  assert.sameValue(callSites[0].raw[0], "\\uc548\\ub155");

  // Functionality covered by other tests:
  // Extra-thorough UTF8 decoding test.
  callSites = [];

  tag`Iñtërnâtiônàlizætiøn\u2603\uD83D\uDCA9`;
  tag`Iñtërnâtiônàlizætiøn☃💩`;

  assert.sameValue(callSites.length, 2);
  assert.sameValue(callSites[0] !== callSites[1], true);
  assert.sameValue(callSites[0][0], "Iñtërnâtiônàlizætiøn☃💩");
  assert.sameValue(
      callSites[0].raw[0], "Iñtërnâtiônàlizætiøn\\u2603\\uD83D\\uDCA9");
  assert.sameValue(callSites[1][0], "Iñtërnâtiônàlizætiøn☃💩");
  assert.sameValue(callSites[1].raw[0], "Iñtërnâtiônàlizætiøn☃💩");
})();


// Irrelevant
(function testExtendedArrayPrototype() {
  Object.defineProperty(Array.prototype, 0, {
    set: function() {
      assert(false);
    },
    configurable: true
  });
  function tag(){}
  tag`a${1}b`;
  delete Array.prototype[0];
})();


// Functionality covered by other tests
(function testRawLineNormalization() {
  function raw0(callSiteObj) {
    return callSiteObj.raw[0];
  }
  assert.sameValue(eval("raw0`\r`"), "\n");
  assert.sameValue(eval("raw0`\r\n`"), "\n");
  assert.sameValue(eval("raw0`\r\r\n`"), "\n\n");
  assert.sameValue(eval("raw0`\r\n\r\n`"), "\n\n");
  assert.sameValue(eval("raw0`\r\r\r\n`"), "\n\n\n");
})();


(function testLiteralAfterRightBrace() {
  // Regression test for https://code.google.com/p/v8/issues/detail?id=3734
  function f() {}
  `abc`;

  function g() {}`def`;

  {
    // block
  }
  `ghi`;

  {
    // block
  }`jkl`;
})();


// Functionality covered by other tests
(function testLegacyOctal() {
  assert.sameValue(`\0a`, '\u0000a');
})();


// Functionality covered by other tests
(function testSyntaxErrorsNonEscapeCharacter() {
  for (var i = 1; i < 8; i++) {
    var code = "`\\" + i + "`";
    //assert.throws(SyntaxError, code);
    code = "(function(){})" + code;
    //assert.throws(SyntaxError, code);
  }
})();


(function testLegacyOctalEscapesInExpressions() {
  // Functionality covered by other tests
  // Disallowed in template tail
  //assert.throws(SyntaxError, "`${\"\\07\"}\\07`");
})();


// Functionality covered by other tests
(function testCallResultOfTagFn() {
  "use strict";
  var i = 0;
  var raw = [];
  function tag(cs) {
    var args = Array.prototype.slice.call(arguments);
    var text = String.raw.apply(null, args);
    if (i++ < 2) {
      raw.push("tag;" + text);
      return tag;
    }

    raw.push("raw;" + text);
    return text;
  }
  assert.sameValue(tag`test1``test2``test3`, "test3");
  assert.sameValue(raw[0], "tag;test1");
  assert.sameValue(raw[1], "tag;test2");
  assert.sameValue(raw[2], "raw;test3");
  assert.sameValue(raw.length, 3);
})();


(function testTaggedToStringSubstitutionsOrder() {
  var subs = [];
  var log = [];
  var tagged = [];
  function getter(name, value) {
    return {
      get: function() {
        log.push("get" + name);
        return value;
      },
      set: function(v) {
        log.push("set" + name);
      }
    };
  }
  Object.defineProperties(subs, {
    0: getter(0, 1),
    1: getter(1, 2),
    2: getter(2, 3)
  });

  function tag(cs) {
    var n_substitutions = arguments.length - 1;
    var n_cooked = cs.length;
    var e = cs[0];
    var i = 0;
    assert.sameValue(n_cooked, n_substitutions + 1);
    while (i < n_substitutions) {
      var sub = arguments[i++ + 1];
      var tail = cs[i];
      tagged.push(sub);
      e = e.concat(sub, tail);
    }
    return e;
  }

  assert.sameValue(tag`-${subs[0]}-${subs[1]}-${subs[2]}-`, "-1-2-3-");
  assert.sameValue(log[0], "get0");
  assert.sameValue(log[1], "get1");
  assert.sameValue(log[2], "get2");
  assert.sameValue(log.length, 3);
  assert.sameValue(tagged[0], 1);
  assert.sameValue(tagged[1], 2);
  assert.sameValue(tagged[2], 3);
  assert.sameValue(tagged.length, 3);

  tagged.length = 0;
  log.length = 0;
  assert.sameValue(tag`-${subs[0]}-`, "-1-");
  assert.sameValue(log[0], "get0");
  assert.sameValue(log.length, 1);
  assert.sameValue(tagged[0], 1);
  assert.sameValue(tagged.length, 1);
})();
