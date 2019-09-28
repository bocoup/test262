import os

from ..check import Check
from ..frontmatter import parse

class CheckFeatures(Check):
    '''Ensure tests specify only `features` from a list of valid values.'''
    ID = 'FEATURES'
    _harness_cache = dict()

    def __init__(self, filename):
        with open(filename, 'r') as f:
            self.valid_features = self._parse(f.read())

    @staticmethod
    def _parse(content):
        features = []
        for line in content.split():
            if not line or line.startswith('#'):
                continue
            features.append(line)
        return features

    @staticmethod
    def _load(include_name):
        if include_name not in CheckFeatures._harness_cache:
            with open(os.path.join('harness', include_name), 'r') as f:
                source = f.read()

            CheckFeatures._harness_cache[include_name] = set(
                parse(source).get('features', [])
            )

        return CheckFeatures._harness_cache.get(include_name)

    def run(self, name, meta, source):
        if not meta:
            return

        if 'features' not in meta:
            features = []
        elif len(meta['features']) == 0:
            return 'If present, the `features` tag must have at least one member'
        else:
            features = meta.get('features')

        required = set()
        for include in meta.get('includes', []):
            required.update(self._load(include))

        for feature in features:
            if feature not in self.valid_features:
                return 'Unrecognized feature: "%s"' % feature

            required.discard(feature)

        if required:
            missing = ', '.join(sorted(required))
            if len(features):
                return 'Missing from `features`: %s' % missing
            else:
                return 'Missing: `features: [%s]`' % missing
