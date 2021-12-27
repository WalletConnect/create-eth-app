# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.4] - 2021-12-27

### Fixed

- IPFS script in package.json in React app.

## [1.7.3] - 2021-12-27 [YANKED]

### Fixed

- IPFS deploy script (see [#179](https://github.com/paulrberg/create-eth-app/issues/179))

## [1.7.2] - 2021-11-21

### Fixed

- Include "gitignore" file in dist bundle (see [#175](https://github.com/paulrberg/create-eth-app/issues/175))

## [1.7.1] - 2021-09-20

### Fixed

- Pin version of `url-exist` dependency to 2.0.2 to fix [#162](https://github.com/paulrberg/create-eth-app/issues/162)
- Types for `update-check`

## [1.7.0] - 2021-09-14

### Added

- New links in the default Vue template
- User info in the wallet button with ENS support via [PR #146](https://github.com/paulrberg/create-eth-app/pull/146)

### Changed

- Change `module` to `commonjs` in `tsconfig.json`
- Rename `NETWORK_NAME` variable to `NETWORK`
- Replace the "Disconnect Wallet" label with the user info
- Set initial version of default React and Vue templates to "1.0.0"
- Sort imports
- Upgrade dependencies in default React and Vue templates
- Wrap `web3Modal` instance in `useMemo` hook

### Fixed

- Parsing of GITHUB_REF when it has a prefix like `refs/heads/`

### Removed

- Bespoke configuration for Solidity in `.prettierrc`
- Redundant `nohoist` field in top-level `package.json`, which fixes [issue #139](https://github.com/paulrberg/create-eth-app/issues/139)
- The "www" prefix from links in the default Vue template

## [1.6.5] - 2021-05-26

### Fixed

- Install `core.js` missing dependency in vue handlebars template, which fixes [issue #104](https://github.com/paulrberg/create-eth-app/issues/104)

## [1.6.4] - 2021-05-25

### Fixed

- Yarn workspaces command issue, as patched by @heronblade via [PR #134](https://github.com/paulrberg/create-eth-app/pull/134)

## [1.6.3] - 2021-05-14

### Fixed

- Warning caused by duplicate `body` tag, which fixes [issue #55](https://github.com/paulrberg/create-eth-app/issues/55)

## [1.6.2] - 2020-12-20

### Fixed

- The infinite re-render bug, as reported and patched by @gasolin with [PR #92](https://github.com/paulrberg/create-eth-app/pull/92)

## [1.6.1] - 2020-11-20

### Added

- Balancer template, as per [PR #98](https://github.com/PaulRBerg/create-eth-app/pull/98)
- mStable template, as per [PR #97](https://github.com/PaulRBerg/create-eth-app/pull/97)
- [Internal] Comprehensive unit and integration tests with good coverage of the repo, as per [PR #86](https://github.com/PaulRBerg/create-eth-app/pull/86)
- [Internal] New [env.ts](https://github.com/PaulRBerg/create-eth-app/tree/v1.6.1/src/helpers/env.ts) helper that deals with environment variable management

### Changed

- Refactor web3Modal code as a React Hook, [courtesy](https://github.com/PaulRBerg/create-eth-app/pull/79) of @gasolin
- Rename "dist" to "build" in Vue.js templates, as per [PR #77](https://github.com/PaulRBerg/create-eth-app/pull/77)
- Strict version tags for the download urls, as per [PR #76](https://github.com/PaulRBerg/create-eth-app/pull/76)
- Upgrade dependencies, both ours and the react and vue template ones
- [Internal] Rename many of the helpers, e.g. `isFolderEmpty` to `directories`
- [Internal] Upgrade to TypeScript v4
- [Internal] Use ESlint instead of TSLint and fix [issue #74](https://github.com/PaulRBerg/create-eth-app/issues/74)
- [Internal] Use @vercel/ncc instead of @zeit/ncc and fix [issue #21](https://github.com/PaulRBerg/create-eth-app/issues/21)

### Fixed

- Duplicate comment about Infura, [courtesy](https://github.com/PaulRBerg/create-eth-app/pull/84) of @gasolin
- [Internal] [Issue #56](https://github.com/PaulRBerg/create-eth-app/issues/56) by setting up CI on GitHub Actions

## [1.5.0] - 2020-09-14

### Added

- Simple integration of web3Modal to React templates, as per [PR #63](https://github.com/PaulRBerg/create-eth-app/pull/63)

## [1.4.1] - 2020-09-03

### Fixed

- Branch name set back to "develop" after being erroneously set to "staging" when v1.4.0 was shipped

## [1.4.0] - 2020-08-23

### Added

- New IPFS deployment script allowing publishing of apps with `yarn ipfs`, as per [PR #58](https://github.com/PaulRBerg/create-eth-app/pull/58)

### Changed

- Update React template component styling to use [styled-components](https://styled-components.com/), as per [PR #51](https://github.com/PaulRBerg/create-eth-app/pull/51)
- Update the location of subgraph query definitions, as per [PR #50](https://github.com/PaulRBerg/create-eth-app/pull/50)
- Update the `@uniswap/sdk` version to v3.0.2, as per [PR #52](https://github.com/PaulRBerg/create-eth-app/pull/52)

### Fixed

- Incorrect package names in certain templates' READMEs fixed, as per [PR #54](https://github.com/PaulRBerg/create-eth-app/pull/54)

## [1.3.1] - 2020-07-30

### Changed

- The Compound template, as per [issue #39](https://github.com/PaulRBerg/create-eth-app/issues/39)

### Fixed

- Bug in Aave template, as per [PR #46](https://github.com/PaulRBerg/create-eth-app/pull/46)
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
- Use only `dependencies` in the frontend app package instead of both `dependencies` and `devDependencies`
- (Contributors) Define the branch whence the templates are pulled as an editable property

### Fixed

- Add missing local dependencies, as per [issue #36](https://github.com/PaulRBerg/create-eth-app/issues/36)

### Removed

- The duplicated React and Vue.js code from the `templates` folder

## [1.2.0] - 2020-05-09

### Added

- New command-line argument: `--framework`
- Vue.js templates for the default template and all other DeFi templates

### Changed

- Bring [the default template](https://github.com/paulrberg/cea-template) into this repository
- Move the `isUrlOk` function from `templates.js` to its bespoke file
- Rename the Sablier template from "sablier" to "sablier-v1"
- Reorganise the React templates under a new directory called "react"
- Swap the Create React App labels with Create Eth App labels in the default template

### Removed

- The `downloadAndExtractTemplate` function in `templates.js`
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

- Set `module` to `ES2015` and `skipLibCheck` to `false` in the root `tsconfig.json`

### Fixed

- Fix minor typos in README

## [1.0.0] - 2020-02-15

### Added

- Initial release of the tool
- The default template

[1.7.4]: https://github.com/paulrberg/create-eth-app/compare/v1.7.3...v1.7.4
[1.7.3]: https://github.com/paulrberg/create-eth-app/compare/v1.7.2...v1.7.3
[1.7.2]: https://github.com/paulrberg/create-eth-app/compare/v1.7.1...v1.7.2
[1.7.1]: https://github.com/paulrberg/create-eth-app/compare/v1.7.0...v1.7.1
[1.7.0]: https://github.com/paulrberg/create-eth-app/compare/v1.6.5...v1.7.0
[1.6.5]: https://github.com/paulrberg/create-eth-app/compare/v1.6.4...v1.6.5
[1.6.4]: https://github.com/paulrberg/create-eth-app/compare/v1.6.3...v1.6.4
[1.6.3]: https://github.com/paulrberg/create-eth-app/compare/v1.6.2...v1.6.3
[1.6.2]: https://github.com/paulrberg/create-eth-app/compare/v1.6.1...v1.6.2
[1.6.1]: https://github.com/paulrberg/create-eth-app/compare/v1.5.0...v1.6.1
[1.5.0]: https://github.com/paulrberg/create-eth-app/compare/v1.4.1...v1.5.0
[1.4.1]: https://github.com/paulrberg/create-eth-app/compare/v1.4.0...v1.4.1
[1.4.0]: https://github.com/paulrberg/create-eth-app/compare/v1.3.1...v1.4.0
[1.3.1]: https://github.com/paulrberg/create-eth-app/compare/v1.3.0...v1.3.1
[1.3.0]: https://github.com/paulrberg/create-eth-app/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/paulrberg/create-eth-app/compare/v1.1.1...v1.2.0
[1.1.1]: https://github.com/paulrberg/create-eth-app/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/paulrberg/create-eth-app/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/paulrberg/create-eth-app/releases/tag/v1.0.0
