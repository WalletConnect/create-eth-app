This project was bootstrapped with [Create Eth App](https://github.com/paulrberg/create-eth-app).

## Project Structure

The default template is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Workspaces makes it possible to setup multiple packages in such a way that we only need to run `yarn install` once to install all of them in
a single pass. Dependencies are hoisted at the root.

```
my-eth-app
├── README.md
├── node_modules
├── package.json
├── .eslintrc
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
    ├── vue-app
    │   ├── README.md
    │   ├── babel.config.js
    │   ├── node_modules
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   └── index.html
    │   └── src
    │       ├── assets
    │       │   └── ethereumLogo.png
    │       ├── components
    │       │   └── HelloWorld.vue
    │       ├── App.vue
    │       └── main.js
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

Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.

## Available Scripts

In the project directory, you can run:

### Vue App

#### `yarn vue-app:serve`

Compiles and hot-reloads for development.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

#### `yarn vue-app:lint`

Lints and fixes files.

#### `yarn vue-app:build`

Compiles and minifies for production. <br/>

See the Vue documentation on [deployment](https://vuejs.org/v2/guide/deployment.html) for more information.

### Subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. <br/>

To learn more, check out the [The Graph documentation](https://thegraph.com/docs).

#### `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### `yarn subgraph:auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn subgraph:deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).
