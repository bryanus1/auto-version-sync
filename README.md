# Auto Version Sync

[![release][release-badge]][release]
[![license][license-badge]][license]

A GitHub Action to automatically sync project versions based on labels in pull requests. This action increments the software version in the package.json file and creates a new GitHub tag based on the configured PR labels, allowing for more efficient and automated version control.

## Inputs

| NAME              | DESCRIPTION                                    | TYPE     | REQUIRED | DEFAULT |
| ----------------- | ---------------------------------------------- | -------- | -------- | ------- |
| `level`           | A semver update level ({major, minor, patch}). | `string` | `false`  | `minor` |
| `current_version` | The current version.                           | `string` | `false`  | `0.1.0` |

## Outputs

| NAME                    | DESCRIPTION                            | TYPE     | Example  |
| ----------------------- | -------------------------------------- | -------- | -------- |
| `new_version`           | The bumped semver version.             | `string` | `v1.0.0` |
| `new_version_without_v` | The bumped semver version without "v". | `string` | `1.0.0`  |

## Example

```yaml
permissions:
  contents: write

jobs:
  auto-version-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: bryanus1/auto-version-sync@v1.0.0
```

### With inputs

```yaml
permissions:
  contents: write

jobs:
  auto-version-sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - uses: bryanus1/auto-version-sync@v1.0.0
        with:
          level: 'patch'
          current_version: v1.0.0
```

## License

Copyright 2024 bryanus1.

Action Add Labels is released under the [MIT License](./LICENSE).

<!-- badge links -->

[release]: https://github.com/actions-ecosystem/action-add-labels/releases
[release-badge]: https://img.shields.io/github/package-json/v/bryanus1/auto-version-sync
[license]: LICENSE
[license-badge]: https://img.shields.io/github/license/bryanus1/auto-version-sync
