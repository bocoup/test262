#!/usr/bin/env python3
import os
import re

features = [
  ['array-copywithin', 'copyWithin'],
]

for feature in features:
    feature[1] = re.sub('/', os.path.sep, feature[1])
    feature[1] = re.sub('\*\*', f'(^|^.*{os.path.sep}|{os.path.sep}|{os.path.sep}.*{os.path.sep}|{os.path.sep}.*$|$)', feature[1])
    feature[1] = re.compile(feature[1])

for root, _, _ in os.walk('test'):
    for name, pattern in features:
        if pattern.search(root):
            # TODO: write a WEB_FEATURES.yml file to `root`
            print(name, root)
