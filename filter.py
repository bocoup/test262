#!/usr/bin/env python3

import os
import sys
import yaml

def read_features(filename):
    with open(filename, 'r') as handle:
        frontmatter = None
        for line in handle:
            if frontmatter is not None:
                if line.strip() == '---*/':
                    break
                frontmatter += line
            if line.strip() == '/*---':
                frontmatter = ''
        assert frontmatter is not None
        return yaml.safe_load(frontmatter).get('features', [])

def match(file_path, tag_filters):
    tags = read_features(file_path)

    for tag_filter in tag_filters:
        if tag_filter.startswith('!'):
            if tag_filter[1:] in tags:
                return None
        else:
            if tag_filter not in tags:
                return None
    return tags or ['(none)']

def group(tags):
    counts = dict()
    for tag in tags:
        counts.setdefault(tag, 0)
        counts[tag] += 1
    return counts

def main(directory, *tag_filters):
    included = set()
    excluded = set()
    tags = []

    for entry in os.scandir(directory):
        if not entry.is_file():
            continue
        file_path = entry.path

        entry_tags = match(file_path, tag_filters)
        if entry_tags:
            included.add(file_path)
            tags.extend(entry_tags)
        else:
            excluded.add(file_path)

    print(f'{len(included)} matching test(s)')
    print(f'{len(excluded)} excluded test(s)')
    print('tag counts for matching tests:')
    for name, count in group(tags).items():
        print('  {:4d} {}'.format(count, name))

main(*sys.argv[1:])
