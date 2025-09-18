#!/usr/bin/env python3
import os
import re
import yaml

features = []
sources = ['./generate-source-1.yml', './generate-source-2.yml']
feature_names = set([
  'arguments-callee',
  'array',
  'array-at',
  'array-by-copy',
  'array-copywithin',
  'array-fill',
  'array-find',
  'array-findlast',
  'array-flat',
  'array-from',
  'array-fromasync',
  'array-group',
  'array-includes',
  'array-isarray',
  'array-iteration-methods',
  'array-iterators',
  'array-of',
  'array-splice',
  'async-await',
  'async-generators',
  'async-iterators',
  'atomics-wait-async',
  'bigint64array',
  'class-syntax',
  'date-get-year-set-year',
  'destructuring',
  'escape-unescape',
  'exponentiation',
  'float16array',
  'functions',
  'functions-caller-arguments',
  'generators',
  'globalthis',
  'hashbang-comments',
  'html-wrapper-methods',
  'input-date-time',
  'intl-display-names',
  'intl-duration-format',
  'intl-list-format',
  'intl-locale-info',
  'intl-locale-info',
  'intl-locale-info',
  'intl-plural-rules',
  'intl-relative-time-format',
  'intl-segmenter',
  'iterator-methods',
  'iterators',
  'javascript',
  'json-modules',
  'json-modules',
  'json-raw',
  'let-const',
  'logical-assignments',
  'map',
  'math-sum-precise',
  'nullish-coalescing',
  'number',
  'numeric-seperators',
  'optional-catch-binding',
  'promise',
  'promise-allsettled',
  'promise-any',
  'promise-finally',
  'promise-try',
  'promise-withresolvers',
  'proxy-reflect',
  'set',
  'set-methods',
  'shared-memory',
  'spread',
  'stable-array-sort',
  'string-at',
  'string-codepoint',
  'string-includes',
  'string-matchall',
  'string-normalize',
  'string-pad',
  'string-raw',
  'string-repeat',
  'string-replaceall',
  'strings',
  'string-startsends-with',
  'string-trim-startend',
  'string-wellformed',
  'symbol',
  'template-literals',
  'temporal',
  'top-level-await',
  'typed-array-iteration-methods',
  'typed-array-iterators',
  'typed-arrays',
  'uint8array-base64-hex',
  'unicode-point-escapes', 
#   'wasm-bigint', Currently, no apparent test coverage for WebAssembly BigInt integration
  'weakmap',
  'weak-references',
  'weakset',
  'with'
])

for source in sources:
    with open(source, 'r') as f:
        features.extend(yaml.safe_load(f))

for feature in features:
    assert feature[0] in feature_names, f"Unrecognized feature: '{feature[0]}'"
    feature[1] = re.sub('/', os.path.sep, feature[1])
    feature[1] = re.sub('\*\*', f'(^|^.*{os.path.sep}|{os.path.sep}|{os.path.sep}.*{os.path.sep}|{os.path.sep}.*$|$)', feature[1])
    feature[1] = re.compile('^' + feature[1] + '$')

for root, _, _ in os.walk('test'):
    for name, pattern, *rest in features:
        if pattern.search(root):
            if len(rest) == 0:
                filters_string = 'files: \'**\''
            else:
                assert len(rest) > 1
                assert rest[0] in ['files', 'tags']
                filters_string = f'{rest[0]}: [{", ".join(rest[1:])}]'
            # TODO: write a WEB_FEATURES.yml file to `root`
            print(name, root, f'({filters_string})')

features_from_subdirectories = set(map(lambda item: item[0], features))
with open('./test/WEB_FEATURES.yml', 'r') as f:
    web_features = yaml.safe_load(f)
features_from_top_level = set(map(lambda feature: feature['name'], web_features['features']))

feature_names_completed = features_from_subdirectories.union(features_from_top_level)
for feature_name in sorted(feature_names.difference(feature_names_completed)):
    print(f"https://webstatus.dev/features/{feature_name}")

print(len(features_from_subdirectories), 'features from subdirectories')
print(len(features_from_top_level), 'features from top level')
