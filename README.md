# Create Eth App [![Styled with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io) [![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue.svg)](https://github.com/facebook/create-react-app/blob/master/CONTRIBUTING.md)

Create Ethereum-powered apps with one command.

Create Eth App works on macOS, Windows, and Linux.<br>
If something doesn’t work, please [file an issue](https://github.com/paulrberg/create-eth-app/issues/new).<br>
If you have questions or need help, please ask in our [Discord](https://discord.gg/bsS8T47) community.

## Quick Overview

```sh
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

If you've previously installed `create-eth-app` globally via `yarn global add create-eth-app`, we recommend you
uninstall the package using `yarn global remove create-eth-app` and use the `yarn create eth-app` shorthand to ensure that you use the last version.

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>
When you’re ready to deploy to production, create a minified bundle with `yarn run react-app:build`.

<p align="center">
<img src="./screencast.gif" width="600" alt="yarn react-app:start">
</p>

## Creating an App

**You’ll need to have Node 14 or later version on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

**You'll also need Yarn on your local development machine**. This is because Create Eth App relies on Yarn
Workspaces, a feature not supported by Npm.

To create a new app, you may use the following method:

```sh
yarn create eth-app my-eth-app
```

_[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

It will create a directory called `my-eth-app` inside the current folder.<br>

Inside that directory, if you didn't use a custom [framework](https://github.com/paulrberg/create-eth-app#frameworks) or [template](https://github.com/paulrberg/create-eth-app#templates), you will get the initial project structure:

```
my-eth-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── packages
    ├── contracts
    │   ├── README.json
    │   ├── package.json
    │   └── src
    │       ├── abis
    │       │   ├── erc20.json
    │       │   └── ownable.json
    │       ├── addresses.js
    │       └── index.js
    ├── react-app
    │   ├── README.md
    │   ├── package.json
    │   ├── node_modules
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   └── manifest.json
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── ethereumLogo.svg
    │       ├── index.css
    │       ├── index.js
    │       ├── serviceWorker.js
    │       └── setupTests.js
    └── subgraph
        ├── README.md
        ├── abis
        │   └── erc20.json
        ├── package.json
        ├── schema.graphql
        ├── src
        │   └── mappings
        │       ├── tokens.ts
        │       └── transfers.ts
        └── subgraph.yaml
```

Once the installation is done, you can open your project folder:

```sh
cd my-eth-app
```

### Frameworks

Create Eth App supports multiple frontend frameworks. See the folders under [templates](/templates) for a complete list of the available options. <br>

You can pass the name of the framework as the value for the `--framework` command-line argument. Create Eth App defaults to React if no framework is provided manually.

```sh
yarn create eth-app my-eth-app --framework vue
```

### Templates

Create Eth App comes with a host of decentralized finance templates pre-filled with contract ABIs, addresses and subgraphs. Go to the [templates](/templates) folder, select any framework from the list and see what templates are available. <br>

You can pass the name of the template as the value for the `--template` command-line argument.

```sh
yarn create eth-app my-eth-app --template compound
```

## Philosophy

- **Minimalistic by design:** You are one command away from creating a new Ethereum-powered React app. No intermediary installs, scripts or shims.

- **End-to-End**: Create Eth App provides you everything that you need to build and maintain an Ethereum-powered React app
  at scale, by bringing Yarn Workspaces, Create React App and The Graph under one roof

- **Aimed at Experience Architects**: As Kames CG argues in [Ethereum Growth's Problem](https://medium.com/horizin/ethereums-growth-problem-5cab86734917), the Ethereum ecosystem is in
  a much greater need for top-notch product creators, not smart contract developers. Create Eth App does
  not enable a smart contract development environment, expecting you to import your own ABIs or build on top of
  an established protocol like [Maker](https://makerdao.com), [Compound](https://compound.finance/) or [Sablier](https://sablier.finance)

- **Not Reinventing The Wheel**: Under the hood, you use Create React App, one of the most popular and battle-tested frontend development
  environments.

## What’s Included?

Your environment will have everything you need to build a modern Ethereum-powered single-page React app:

- Smooth project management via [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- Everything included with [Create React
  App](https://github.com/facebook/create-react-app/blob/master/README.md#whats-included): React, JSX, ES6, TypeScript
  and Flow syntax support
- Template subgraph that indexes the events emitted by an
  [ERC-20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) contract
- Minimalist structure for managing the smart contract [ABIs](https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts) and addresses
- Hassle-free updates for the above tools with a single dependency

## Popular Alternatives

Create Eth App is a great fit for:

- **Learning how to write Ethereum-powered apps** in a comfortable and feature-rich development environment.
- **Starting new Ethereum-powered single-page React applications** without wasting time on copy-pasting boilerplates
- **Creating examples** with React for your Ethereum-related libraries and components.

But Ethereum is a large ecosystem. Here are a few common cases where you might want to try something else:

- If you want to **try Ethereum** in its most basic form, consider [using the Remix in-browser IDE](https://remix.ethereum.org/)
- If you want to **write, test and deploy smart contracts**, consider using
  [Foundry](https://github.com/foundry-rs/foundry) or [Hardhat](https://hardhat.org/)
- If you want to **write smart contracts and also build a frontend app**, consider using [scaffold-eth](https://github.com/scaffold-eth/scaffold-eth)

For alternatives to React in particular, read the [official Create React App
documentation](https://github.com/facebook/create-react-app/blob/master/README.md#popular-alternatives).

## Credits

This project exists thanks to all the people who contributed:

- [@PaulRBerg](https://github.com/paulrberg)
- [@TomAFrench](https://github.com/TomAFrench)
- [@KadenZipfel](https://github.com/kadenzipfel)
- [@rnbrady](https://github.com/rnbrady)

## Acknowledgements

We are grateful to the authors of existing related projects from which we drew inspiration:

- [create-react-app](https://github.com/facebook/create-react-app)
- [create-next-app](https://github.com/zeit/next.js/tree/master/packages/create-next-app)

And also the Vue.js community for the CLI we used to generate our templates:

- [@vue/cli](https://cli.vuejs.org/)

## License

Create Eth App is open source software [licensed as MIT](https://github.com/paulrberg/create-eth-app/blob/develop/LICENSE).
