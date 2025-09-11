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
                return False
        else:
            if tag_filter not in tags:
                return False
    return True

def main(directory, *tag_filters):
    included = set()
    excluded = set()

    for entry in os.scandir(directory):
        if not entry.is_file():
            continue
        file_path = entry.path

        if match(file_path, tag_filters):
            included.add(file_path)
        else:
            excluded.add(file_path)

    for file_path in included:
        print(file_path)

main(*sys.argv[1:])
