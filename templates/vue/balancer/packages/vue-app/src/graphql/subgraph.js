import gql from "graphql-tag";

// See more example queries on https://thegraph.com/explorer/subgraph/balancer-labs/balancer
const GET_PUBLIC_POOL_DATA = gql`
  {
    pools(first: 5, where: {publicSwap: true}) {
      id
      publicSwap
      swapFee
      totalWeight
      tokensList
      tokens {
        address
        balance
        decimals
        symbol
      }
    }
  }
`;

export default GET_PUBLIC_POOL_DATA;
