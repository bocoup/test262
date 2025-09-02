#!/usr/bin/env python3
import os
import re
import yaml

features = [
  ['array-copywithin', '**/copyWithin'],
  ['array-fill', '**/fill'],

  # Should include:
  # - test/built-ins/TypedArray/prototype/findIndex
  # - test/built-ins/TypedArray/prototype/find/BigInt
  # - test/built-ins/TypedArrayConstructors/prototype/find
  # Should NOT include:
  # - test/built-ins/Iterator/prototype/find
  # - test/built-ins/TypeArray/prototype/findLast
  #['array-find', '.*/(Array|TypedArray|TypedArrayConstructors)/.*/(find|findIndex)(/|$)'],
  ['array-find', '**(Array|TypedArray|TypedArrayConstructors)**(find|findIndex)**'],

  # Test262 maintains a "features" flag named `Array.prototype.includes`, but
  # is too expansive for this purpose--used to label tests that incidentally
  # rely on the API without meaningfully verifying its semantics (e.g.
  # `test/intl402/Intl/supportedValuesOf/collations.js`)
  ['array-includes', '**Array/prototype/includes**'],

  # Description inadequate; inferred from source:
  # web-features/features/array-iteration-methods.yml
  ['array-iteration-methods', '**Array**(every|filter|forEach|indexOf|lastIndexOf|map|reduce|reduceRight|some)**'],

  ['array-iterators', '**Array**(Symbol.iterator|entries|keys|values)**'],
  ['array-splice', '**Array**splice**'],

  # Should include
  # - test/annexB/built-ins/Array/from
  # - test/annexB/built-ins/TypedArrayConstructors/from
  ['array-from', '**(Array|TypedArray|TypedArrayConstructors)**from**'],

  ['array-isarray', '**isArray**'],
  ['array-of', '**(Array|TypedArray|TypedArrayConstructors)**of**'],

  ['async-functions', '**(async-function|async-arrow-function|async-method|async-method-static)**'],
  ['async-functions', '**await', '!async-iteration'],
  ['async-functions', '**method-definition', 'async-functions', '!class-methods-private'],
]

for feature in features:
    feature[1] = re.sub('/', os.path.sep, feature[1])
    feature[1] = re.sub('\*\*', f'(^|^.*{os.path.sep}|{os.path.sep}|{os.path.sep}.*{os.path.sep}|{os.path.sep}.*$|$)', feature[1])
    feature[1] = re.compile('^' + feature[1] + '$')

for root, _, _ in os.walk('test'):
    for name, pattern, *filters in features:
        if pattern.search(root):
            if len(filters) == 0:
                filters_string = 'files: \'**\''
            else:
                filters_string = f'frontmatter-keys: [{", ".join(filters)}]'
            # TODO: write a WEB_FEATURES.yml file to `root`
            print(name, root, f'({filters_string})')

features_from_subdirectories = set(map(lambda item: item[0], features))
with open('./test/WEB_FEATURES.yml', 'r') as f:
    web_features = yaml.safe_load(f)
features_from_top_level = set(map(lambda feature: feature['name'], web_features['features']))

print(len(features_from_subdirectories), 'features from subdirectories')
print(len(features_from_top_level), 'features from top level')
