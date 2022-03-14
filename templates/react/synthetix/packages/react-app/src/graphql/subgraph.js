import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/synthetixio-team/synthetix
const GET_TRANSFERS = gql`
  {
    transfers(
      where: {
        source_in: ["sETH", "sUSD"]
        to_not: "0x0000000000000000000000000000000000000000"
        from_not: "0x0000000000000000000000000000000000000000"
      }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      from
      to
      value
      source
      block
    }
  }
`;

export default GET_TRANSFERS;
