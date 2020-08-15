import gql from "graphql-tag";

// See more example queries on https://thegraph.com/explorer/subgraph/graphprotocol/uniswap
const GET_EXCHANGES = gql`
  {
    exchanges(first: 5) {
      id
      tokenAddress
      tokenSymbol
      tokenName
    }
  }
`;

export default GET_EXCHANGES;
