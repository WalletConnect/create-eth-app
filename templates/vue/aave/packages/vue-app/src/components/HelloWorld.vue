<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize the Vue part of
      <br />this project, check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <!-- Remove the "display: none" style and open the JavaScript console in the browser to see what this function does -->
    <button id="readOnchainData" style="display: none;" @click="readOnchainData">Read On-Chain Data</button>
    <h3>Learn Ethereum</h3>
    <ul>
      <li>
        <a
          href="https://ethereum.org/developers/#getting-started"
          target="_blank"
          rel="noopener"
        >Getting Started</a>
      </li>
      <li>
        <a href="https://ethereum.org/wallets/" target="_blank" rel="noopener">Wallets</a>
      </li>
      <li>
        <a href="https://www.reddit.com/r/ethereum/" target="_blank" rel="noopener">Reddit</a>
      </li>
    </ul>
    <h3>Learn Vue</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a>
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Learn Aave</h3>
    <ul>
      <li>
        <a href="https://docs.aave.com/developers/" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://t.me/Aavesome" target="_blank" rel="noopener">Community Chat</a>
      </li>
      <li>
        <a href="https://twitter.com/aaveaave" target="_blank" rel="noopener">Twitter</a>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { MAINNET_ID, addresses, abis } from "@aave-app/contracts";
import { ethers } from "ethers";

const GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS = gql`
  {
    lendingPoolConfigurationHistoryItems(first: 5) {
      id
      provider {
        id
      }
      lendingPool
      lendingPoolCore
    }
  }
`;

export default {
  methods: {
    readOnchainData: async function() {
      // Should replace with the end-user wallet, e.g. Metamask
      const defaultProvider = ethers.getDefaultProvider();
      // Create an instance of ethers.Contract
      // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
      const aDAIContract = new ethers.Contract(addresses[MAINNET_ID].tokens.aDAI, abis.aToken, defaultProvider);
      // A pre-defined address that owns some cDAI tokens
      const aDAIBalance = await aDAIContract.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
      console.log({ aDAIBalance: aDAIBalance.toString() });
    },
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  async mounted() {
    try {
      const { data, loading, stale } = await this.$apollo.query({
        query: GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS,
      });
      if (!loading && !stale && data && data.lendingPoolConfigurationHistoryItems) {
        console.log({ lendingPoolConfigurationHistoryItems: data.lendingPoolConfigurationHistoryItems });
      }
    } catch (error) {
      console.error("Error while pulling data from the subgraph:", error);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-top: 24px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
