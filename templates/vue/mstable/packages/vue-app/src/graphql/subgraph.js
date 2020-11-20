import gql from "graphql-tag";

// See more example queries on https://thegraph.com/explorer/subgraph/mstable/mstable-protocol
const GET_MASSETS = gql`
  {
    massets(first: 5) {
      id
      feeRate
      token {
        id
        decimals
        name
        symbol
        totalSupply {
          exact
        }
      }
    }
  }
`;

export default GET_MASSETS;
