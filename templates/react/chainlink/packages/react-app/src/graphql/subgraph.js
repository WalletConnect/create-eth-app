import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/legacy-explorer/subgraph/tomafrench/chainlink
const GET_PRICES_FEEDS = gql`
  {
    priceFeeds(first: 5) {
      id
      assetPair
      decimals
      latestPrice {
        id
      }
    }
  }
`;

export default GET_PRICES_FEEDS;
