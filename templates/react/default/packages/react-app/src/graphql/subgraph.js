import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/paulrberg/create-eth-app
const GET_TRANSFERS = gql`
  {
    transfers(first: 10) {
      id
      from
      to
      value
    }
  }
`;

export default GET_TRANSFERS;
