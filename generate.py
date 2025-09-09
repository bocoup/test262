#!/usr/bin/env python3
import os
import re
import yaml

features = []
sources = ['./generate-source-1.yml', './generate-source-2.yml']

for source in sources:
    with open(source, 'r') as f:
        features.extend(yaml.safe_load(f))

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
