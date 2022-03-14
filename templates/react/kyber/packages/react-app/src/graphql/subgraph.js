import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/protofire/kyber
const GET_FULL_TRADES = gql`
  {
    fullTrades(first: 5) {
      id
      trader {
        id
      }
      src {
        id
      }
      dest {
        id
      }
    }
  }
`;

export default GET_FULL_TRADES;
