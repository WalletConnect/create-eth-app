require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { toHex, toWei } = require("web3-utils");

/**
 * @dev You must create a `.env` file by following `.env.example`.
 * @param {string} network The name of the testnet
 */
function createProvider(network) {
  if (process.env.CI) {
    return {};
  }
  if (!process.env.MNEMONIC) {
    console.log("Please set your MNEMONIC in a .env file");
    process.exit(1);
  }
  if (!process.env.INFURA_API_KEY) {
    console.log("Please set your INFURA_API_KEY");
    process.exit(1);
  }
  return () => {
    return new HDWalletProvider(process.env.MNEMONIC, `https://${network}.infura.io/v3/` + process.env.INFURA_API_KEY);
  };
}

module.exports = {
  compilers: {
    solc: {
      version: "0.5.16",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
  mocha: {
    bail: true,
    enableTimeouts: false,
  },
  networks: {
    development: {
      host: "127.0.0.1",
      gas: 6e6,
      gasPrice: toHex(toWei("1", "gwei")),
      network_id: "*",
      port: "8545",
      skipDryRun: true,
    },
    goerli: {
      provider: createProvider("goerli"),
      gas: 6e6,
      gasPrice: toHex(toWei("10", "gwei")),
      network_id: 5,
      skipDryRun: true,
    },
    kovan: {
      provider: createProvider("kovan"),
      gas: 6e6,
      gasPrice: toHex(toWei("10", "gwei")),
      network_id: 42,
      skipDryRun: true,
    },
    rinkeby: {
      provider: createProvider("rinkeby"),
      gas: 6e6,
      gasPrice: toHex(toWei("10", "gwei")),
      network_id: 4,
      skipDryRun: true,
    },
    ropsten: {
      provider: createProvider("ropsten"),
      gas: "6000000",
      gasPrice: toHex(toWei("10", "gwei")),
      network_id: 3,
      skipDryRun: true,
    },
  },
};
