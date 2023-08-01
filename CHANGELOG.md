# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Common Changelog](https://common-changelog.org/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[1.8.3]: https://github.com/paulrberg/create-eth-app/compare/v1.8.2...v1.8.3
[1.8.2]: https://github.com/paulrberg/create-eth-app/compare/v1.8.1...v1.8.2
[1.8.1]: https://github.com/paulrberg/create-eth-app/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/paulrberg/create-eth-app/compare/v1.7.4...v1.8.0
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

## [1.8.3] - 2023-08-01

### Changed

- Upgrade `@graphprotocol` dependencies in React template ([#237](https://github.com/PaulRBerg/create-eth-app/pull/237)) (@maxhiker)
- Upgrade `react-scripts` dependency in React template ([#237](https://github.com/PaulRBerg/create-eth-app/pull/237)) (@maxhiker)

## [1.8.2] - 2022-09-16

### Added

- Add `ethers` as a dependency in React template (@jakvbs)

### Changed

- Change Infura API key (@PaulRBerg)
- Upgrade `@usedapp/core` in React template (@jakvbs)

## [1.8.1] - 2022-09-16

### Changed

- Change Infura API key (@PaulRBerg)

## [1.8.0] - 2022-03-19

### Added

- Add Chainlink template for both React and Vue ([#154](https://github.com/paulrberg/create-eth-app/pull/154)) (@fabioDMFerreira)
- Integrate the [useDapp](https://usedapp.io/) framework (@PaulRBerg)

### Changed

- Refactor all contract call examples to use `useDapp` instead of the vanilla `ethers.js` library (@PaulRBerg)
- Rename default package from "@project" to "@my-app" (@PaulRBerg)
- Switch to simpler `@apollo/client` configuration (@PaulRBerg)
- Update subgraph query in the Sablier v1 template (@PaulRBerg)
- Update subgraph query in the Synthetix template (@PaulRBerg)
- Update the subgraph specs to use the latest API versions (@PaulRBerg)
- Use strict mode in React apps (@PaulRBerg)

### Fixed

- Fix the `img` tag in default vue template (@PaulRBerg)

### Removed

- Delete the Balancer template (both React and Vue) (@PaulRBerg)
- Delete the Uniswap v1 template (both React and Vue) (@PaulRBerg)
- Drop support for Node v13 and below (@PaulRBerg)

## [1.7.4] - 2021-12-27

### Fixed

- Fix the IPFS script in the `package.json` file in the React template (@PaulRBerg)

## [1.7.3] - 2021-12-27

_This release was unpublished from npm due to a error in the `package.json` file_

### Fixed

- Fix the IPFS deploy script ([#179](https://github.com/paulrberg/create-eth-app/issues/179)) (@PaulRBerg)

## [1.7.2] - 2021-11-21

### Fixed

- Include "gitignore" file in dist bundle ([#175](https://github.com/paulrberg/create-eth-app/issues/175)) (@PaulRBerg)

## [1.7.1] - 2021-09-20

### Fixed

- Pin version of `url-exist` dependency to 2.0.2 ([#162](https://github.com/paulrberg/create-eth-app/issues/162)) (@PaulRBerg)

## [1.7.0] - 2021-09-14

### Added

- Add links in the default Vue template (@PaulRBerg)
- Add user info in the wallet button with ENS support ([#146](https://github.com/paulrberg/create-eth-app/pull/146)) (@makoto, @PaulRBerg)

### Changed

- Replace the "Disconnect Wallet" label with the user info (@PaulRBerg)
- Upgrade dependencies in default React and Vue templates (@PaulRBerg)
- Wrap `web3Modal` instance in `useMemo` hook (@PaulRBerg)

### Removed

- Remove redundant `nohoist` field in top-level `package.json`
  ([#139](https://github.com/paulrberg/create-eth-app/issues/139)) (@PaulRBerg)
- Remove the "www" prefix from links in the default Vue template (@PaulRBerg)

## [1.6.5] - 2021-05-26

### Fixed

- Install `core.js` missing dependency in vue handlebars template
  ([#104](https://github.com/paulrberg/create-eth-app/issues/104)) (@PaulRBerg)

## [1.6.4] - 2021-05-25

### Fixed

- Fix the yarn workspaces command bug ([#134](https://github.com/paulrberg/create-eth-app/pull/134)) (@joshuabyler)

## [1.6.3] - 2021-05-14

### Fixed

- Fix the warning caused by duplicate `body` tags ([#55](https://github.com/paulrberg/create-eth-app/issues/55)) (@PaulRBerg)

## [1.6.2] - 2020-12-20

### Fixed

- Fix the infinite re-render bug ([#92](https://github.com/paulrberg/create-eth-app/pull/92)) (@gasolin)

## [1.6.1] - 2020-11-20

### Added

- Add Balancer template ([#98](https://github.com/paulrberg/create-eth-app/pull/98)) (@TomAFrench)
- Add mStable template ([#96](https://github.com/paulrberg/create-eth-app/pull/96)) (@PaulRBerg)

### Changed

- Refactor web3Modal code as a React Hook ([#79](https://github.com/paulrberg/create-eth-app/pull/79)) (@gasolin)
- Rename "dist" to "build" in Vue.js templates ([#77](https://github.com/paulrberg/create-eth-app/pull/77)) (@TomAFrench)
- Strict version tags for the download urls ([#76](https://github.com/paulrberg/create-eth-app/pull/76)) (@PaulRBerg)
- Upgrade dependencies (@PaulRBerg)

### Fixed

- Remove duplicate comment about Infura ([#84](https://github.com/paulrberg/create-eth-app/pull/84) (@gasolin)

## [1.5.0] - 2020-09-14

### Added

- Integrate `web3-modal` in React templates ([#63](https://github.com/paulrberg/create-eth-app/pull/63)) (@TomAFrench)

## [1.4.1] - 2020-09-03

### Fixed

- Set branch name back to "develop" (@PaulRBerg)

## [1.4.0] - 2020-08-23

### Added

- Add new IPFS deployment script ([#58](https://github.com/paulrberg/create-eth-app/pull/58)) (@TomAFrench)

### Changed

- Update React template component styling to use `styled-components`
  ([#51](https://github.com/paulrberg/create-eth-app/pull/51)) (@TomAFrench)
- Update the location of subgraph query definitions ([#50](https://github.com/paulrberg/create-eth-app/pull/50)) (@TomAFrench)
- Update to `@uniswap/sdk`v3.0.2 ([#52](https://github.com/paulrberg/create-eth-app/pull/52)) (@TomAFrench)

### Fixed

- Fix incorrect package names in READMEs ([#54](https://github.com/paulrberg/create-eth-app/pull/54)) (@TomAFrench)

## [1.3.1] - 2020-07-30

### Changed

- Update the Compound template ([#39](https://github.com/paulrberg/create-eth-app/issues/39)) (@PaulRBerg)

### Fixed

- Bug in Aave template ([#46](https://github.com/paulrberg/create-eth-app/pull/46)) (@PaulRBerg)
- Incorrect paths in .gitignore ([#43](https://github.com/paulrberg/create-eth-app/pull/43)) (@TomAFrench)

### Removed

- Remove dependency on TypeScript from React template ([#41](https://github.com/paulrberg/create-eth-app/issues/41)) (@PaulRBerg)

## [1.3.0] - 2020-07-19

### Added

- Add four new DeFi templates: Kyber, Maker, Synthetix and Uniswap V2 (@PaulRBerg)

### Changed

- Refactor the template system with Handlebars ([#30](https://github.com/paulrberg/create-eth-app/issues/30)) (@PaulRBerg)
- Make Uniswap v2 the default template when passing `--template uniswap` (@PaulRBerg)
- Upgrade to ethers v5 (@PaulRBerg)
- Use only `dependencies` in the frontend app package instead of both `dependencies` and `devDependencies` (@PaulRBerg)
- (Contributors) Define the branch whence the templates are pulled as an editable property (@PaulRBerg)

### Fixed

- Add missing local dependencies ([#36](https://github.com/paulrberg/create-eth-app/issues/36)) (@PaulRBerg)

### Removed

- Remove the duplicated React and Vue.js code from the `templates` directory (@PaulRBerg)

## [1.2.0] - 2020-05-09

### Added

- Add Vue.js templates for the default template and all other DeFi templates (@PaulRBerg)
- Implement new command-line argument: `--framework` (@PaulRBerg)

### Changed

- Bring [the default template](https://github.com/paulrberg/cea-template) into this repository (@PaulRBerg)
- Move the `isUrlOk` function from `templates.js` to its bespoke file (@PaulRBerg)
- Rename the Sablier template from "sablier" to "sablier-v1" (@PaulRBerg)
- Reorganize the React templates under a new directory called "react" (@PaulRBerg)
- Swap the Create React App labels with Create Eth App labels in the default template (@PaulRBerg)

### Removed

- The `downloadAndExtractTemplate` function in `templates.js` (@PaulRBerg)
- The "packages" section in the [README](/README.md) (@PaulRBerg)

## [1.1.1] - 2020-05-09

### Added

- Add a CHANGELOG file (@PaulRBerg)

### Changed

- New screencast in README ([#19](https://github.com/paulrberg/create-eth-app/pull/19)) (@TomAFrench)

### Fixed

- Fix the yarn workspaces error on Windows ([#20](https://github.com/paulrberg/create-eth-app/pull/20)) (Richard Brady)

## [1.1.0] - 2020-03-10

### Added

- Add four DeFi templates to use with the argument above: Aave, Compound, Sablier and Uniswap v1 (@PaulRBerg)
- Implement command-line argument: `--template` (@PaulRBerg)

### Changed

- Set `module` to `ES2015` and `skipLibCheck` to `false` in the root `tsconfig.json` (@PaulRBerg)

### Fixed

- Fix minor typos in README ([#10](https://github.com/paulrberg/create-eth-app/pull/10)) (Andrew Coathup, Paul Razvan Berg)

## [1.0.0] - 2020-02-15

### Added

- Initial release of the tool (@PaulRBerg)
- The default template (@PaulRBerg)
