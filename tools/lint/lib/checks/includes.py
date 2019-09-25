import os
import re

from ..check import Check
from ..frontmatter import parse

class CheckIncludes(Check):
    '''Ensure tests make use of the harness files that they require via the
    `includes` directive.'''
    ID = 'INCLUDES'
    _cache = dict()

    @staticmethod
    def _uses(source, include_name):
        includes = CheckIncludes._cache.get(include_name)

        if not includes:
            with open(os.path.join('harness', include_name), 'r') as f:
                metadata = parse(f.read())
            includes = [
                re.compile(re.escape(name)) for name in metadata['defines']
            ]
            CheckIncludes._cache[include_name] = includes

        for pattern in includes:
            if pattern.search(source):
                return True

        return False

    def run(self, name, meta, source):
        if not meta or 'includes' not in meta:
            return

        includes = meta['includes']

        if len(includes) == 0:
            return 'If present, the `includes` tag must have at least one member'

        without_frontmatter = re.sub(
            r'/\*---.*---\*/', '', source, flags=re.DOTALL
        )

        for include_file in includes:
            if not self._uses(without_frontmatter, include_file):
                return 'Unused include: "%s"' % include_file
