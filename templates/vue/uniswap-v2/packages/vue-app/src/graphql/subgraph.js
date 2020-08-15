import gql from "graphql-tag";

// See more example queries on https://thegraph.com/explorer/subgraph/uniswap/uniswap-v2
const GET_AGGREGATED_UNISWAP_DATA = gql`
  {
    uniswapFactories(first: 1) {
      pairCount
      totalVolumeUSD
      totalLiquidityUSD
    }
  }
`;

export default GET_AGGREGATED_UNISWAP_DATA;
