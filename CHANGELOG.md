# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.2] - 2020-12-20

### Fixed

- The infinite re-render bug, as reported and patched by @gasolin with [pull request #92](https://github.com/paulrberg/create-eth-app/pull/92)

## [1.6.1] - 2020-11-20

### Added

- Balancer template, as per [pull request #98](https://github.com/PaulRBerg/create-eth-app/pull/98)
- mStable template, as per [pull request #97](https://github.com/PaulRBerg/create-eth-app/pull/97)
- [Internal] Comprehensive unit and integration tests with good coverage of the repo, as per [pull request #86](https://github.com/PaulRBerg/create-eth-app/pull/86)
- [Internal] New [env.ts](https://github.com/PaulRBerg/create-eth-app/tree/v1.6.1/src/helpers/env.ts) helper that deals with environment variable management

### Changed

- Refactor web3Modal code as a React Hook, [courtesy](https://github.com/PaulRBerg/create-eth-app/pull/79) of @gasolin
- Renamed "dist" to "build" in Vue.js templates, as per [pull request #77](https://github.com/PaulRBerg/create-eth-app/pull/77)
- Strict version tags for the download urls, as per [pull request #76](https://github.com/PaulRBerg/create-eth-app/pull/76)
- Upgraded dependencies, both ours and the react and vue template ones
- [Internal] Rename many of the helpers, e.g. "isFolderEmpty" to "directories"
- [Internal] Upgrade to TypeScript v4
- [Internal] Use ESlint instead of TSLint and fix [issue #74](https://github.com/PaulRBerg/create-eth-app/issues/74)
- [Internal] Use @vercel/ncc instead of @zeit/ncc and fix [issue #21](https://github.com/PaulRBerg/create-eth-app/issues/21)

### Fixed

- Duplicated comment about Infura, [courtesy](https://github.com/PaulRBerg/create-eth-app/pull/84) of @gasolin
- [Internal] [Issue #56](https://github.com/PaulRBerg/create-eth-app/issues/56) by setting up CI on GitHub Actions

## [1.5.0] - 2020-09-14

### Added

- Simple integration of web3Modal to React templates, as per [pull request #63](https://github.com/PaulRBerg/create-eth-app/pull/63)

## [1.4.1] - 2020-09-03

### Fixed

- Branch name set back to "develop" after being erroneously set to "staging" when v1.4.0 was shipped

## [1.4.0] - 2020-08-23

### Added

- New IPFS deployment script allowing publishing of apps with `yarn ipfs`, as per [pull request #58](https://github.com/PaulRBerg/create-eth-app/pull/58)

### Changed

- React template component styling has been updated to use [styled-components](https://styled-components.com/), as per [pull request #51](https://github.com/PaulRBerg/create-eth-app/pull/51)
- The location of subgraph query definitions has been updated, as per [pull request #50](https://github.com/PaulRBerg/create-eth-app/pull/50)
- The @uniswap/sdk version has been updated to v3.0.2, as per [pull request #52](https://github.com/PaulRBerg/create-eth-app/pull/52)

### Fixed

- Incorrect package names in certain templates' READMEs fixed, as per [pull request #54](https://github.com/PaulRBerg/create-eth-app/pull/54)

## [1.3.1] - 2020-07-30

### Changed

- The Compound template, as per [issue #39](https://github.com/PaulRBerg/create-eth-app/issues/39)

### Fixed

- Bug in Aave template, as per [pull request #46](https://github.com/PaulRBerg/create-eth-app/pull/46)
- Incorrect paths in .gitignore, as per [5eabf30](https://github.com/PaulRBerg/create-eth-app/commit/5eabf30a664b68b66b28754e542b791b598249bd)

### Removed

- TypeScript as a dev dependency in the React app, as per [issue #41](https://github.com/PaulRBerg/create-eth-app/issues/41)

## [1.3.0] - 2020-07-19

### Added

- Four DeFi templates: Kyber, Maker, Synthetix and Uniswap V2, settable as values for the `--template` command-line argument

### Changed

- Refactor the template system, which is now a "template of templates" built with
  [handlebars.js](https://handlebarsjs.com/) as per [issue #30](https://github.com/PaulRBerg/create-eth-app/issues/30)
- Make Uniswap v2 the default template when passing `--template uniswap`
- Upgrade to ethers v5
- Use only "dependencies" in the frontend app package instead of both "dependencies" and "devDependencies"
- (Contributors) Define the branch whence the templates are pulled as an editable property

### Fixed

- Add missing local dependencies, as per [issue #36](https://github.com/PaulRBerg/create-eth-app/issues/36)

### Removed

- The duplicated React and Vue.js code from the "templates" folder

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
