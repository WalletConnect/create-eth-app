## @project/subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API.

## Available Scripts

In the project directory, you can run:

### Subgraph

#### `yarn codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn build`

Compiles the subgraph to WebAssembly.

#### `yarn auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).

## Learn More

To learn The Graph, check out the [The Graph documentation](https://thegraph.com/docs).

---

1. Generate types
2. Build distributable files
3. Deploy to the remote API

## Learn More

You can learn more in the [The Graph documentation](https://thegraph.com/docs).<br/>

Also consider joining [The Graph Discord server](https://discord.gg/vtvv7FP), where you can seek out help.

## Common Errors

### Failed to Compile

> ✖ Failed to compile subgraph: Failed to compile data source mapping: Import file 'src/types/schema.ts' not found.
> Error: Failed to compile data source mapping: Import file 'src/types/schema.ts' not found.

Run the `yarn subgraph` and this error will go away.

### No Access Token

> ✖ No access token provided

Make sure that you followed the instructions listed above for [yarn auth](#yarn-auth).

### Failed to Deploy

> ✖ Failed to deploy to Graph node https://api.thegraph.com/deploy/: Invalid account name or access token

Make sure that you:

1. Signed up on the [Graph Explorer](https://thegraph.com/explorer)
2. Followed the instructions listed above for [yarn auth](#yarn-auth)
3. Replaced `paulrberg/create-eth-app` with your subgraph's name
