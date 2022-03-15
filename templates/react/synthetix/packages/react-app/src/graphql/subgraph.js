import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/synthetixio-team/synthetix
const GET_SYNTH_HOLDERS = gql`
  {
    synthHolders(first: 10) {
      id
      balanceOf
      synth
    }
  }
`;

export default GET_SYNTH_HOLDERS;
