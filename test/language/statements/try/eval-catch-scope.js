'use strict';
//var y;
//var [x = (y = 1)] = [];
//var x;
//try {
//  throw [];
//} catch ([e = (x = 1)]) {}

//function f([a = (x = 1)]) {}
//f([]);

//var [v = (x = 1)] = [];

print('before');
let x, y;
let [x = (y = 1)] = [];
print('after:', x, y);

//    let a = 0, b = 0, c = 0;
//    var v;
//    {
//      let [a = 1, b = (v = 1), c = 1] = [];
//    }
//    print(a, b, c);
