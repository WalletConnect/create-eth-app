import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/aave/protocol
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

export default GET_LENDING_POOL_CONFIGURATION_HISTORY_ITEMS;
