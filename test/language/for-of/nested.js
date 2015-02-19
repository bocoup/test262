
function* values() {
  yield 3;
  yield 7;
}

var iterable1 = values();
var expected = [3, 7];
var i = 0;
var iterable2, j;

for (var x of iterable1) {
  assert.sameValue(x, expected[i]);
  iterable2 = values();
  j = 0;
  for (var y of iterable2) {
    assert.sameValue(y, expected[j]);
    j++;
  }
  assert.sameValue(j, 2);
  i++;
}

assert.sameValue(i, 2);
