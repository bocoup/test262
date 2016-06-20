// Copyright (C) 2015 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
description: >
    `Promise.all` invoked on a constructor value
es6id: 25.4.4.1
info: >
    1. Let C be the this value.
    [...]
    6. Let promiseCapability be NewPromiseCapability(C).
    [...]
    10. Let iteratorRecord be Record {[[iterator]]: iterator, [[done]]: false}.
    11. Let result be PerformPromiseAll(iteratorRecord, C, promiseCapability).
    [...]
    13. Return Completion(result).
flags: [async]
---*/

(function(print) {
var err = new Error();
var rejectCount = 0;
var flag = false;
var P = function(executor) {
  print('create');
  if (flag) {
    return new Promise(executor);
  }
  flag = true;
  return new Promise(function(_, realReject) {
    executor(function() { print('throwing'); throw err }, realReject);
  });
};
P.all = Promise.all;
P.resolve = Promise.resolve;

P.all([Promise.resolve(3)])
  .then(function() {
    print('resolve');
  }, function(e) {
    print('reject', e === err);
  });
}(typeof console !== 'undefined' ? console.log.bind(console) : print));
