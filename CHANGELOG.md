# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2020-05-09

### Added

- New command-line argument: `--framework`
- Vue.js templates for the default template and all other DeFi templates

### Changed

- Bring [the default template](https://github.com/paulrberg/cea-template) into this repository
- Move the "isUrlOk" function from `templates.js` to its bespoke file
- Rename the Sablier template from "sablier" to "sablier-v1"
- Reorganise the React templates under a new subfolder called "react"
- Swap the Create React App labels with Create Eth App labels in the default template

### Removed

- The "downloadAndExtractTemplate" function in `templates.js`
- The "packages" section in the [README](/README.md)

## [1.1.1] - 2020-05-09

### Added

- This CHANGELOG file

### Changed

- New screencast in README, courtesy of [@TomAFrench](https://github.com/TomAFrench)

### Fixed

- The workspaces error on Windows, thanks to [@rnbrady](https://github.com/rnbrady)

## [1.1.0] - 2020-03-10

### Added

- New command-line argument: `--template`
- Four DeFi templates to use with the argument above: Aave, Compound, Sablier and Uniswap v1

### Changed

- Set "module" to "ES2015" and "skipLibCheck" to "false" in the root `tsconfig.json`

### Fixed

- Fix minor typos in README

## [1.0.0] - 2020-02-15

### Added

- Initial release of the tool
- The default template

[1.2.0]: https://github.com/paulrberg/create-eth-app/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/paulrberg/create-eth-app/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/paulrberg/create-eth-app/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/paulrberg/create-eth-app/releases/tag/v1.0.0
