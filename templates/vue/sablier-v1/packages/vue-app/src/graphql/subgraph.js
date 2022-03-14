import { gql } from "@apollo/client";

// See more example queries on https://thegraph.com/explorer/subgraph/sablierhq/sablier
const GET_STREAMS = gql`
  {
    streams(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      cancellation {
        recipientBalance
        timestamp
        txhash
      }
      deposit
      ratePerSecond
      recipient
      sender
      startTime
      stopTime
      timestamp
      token {
        id
        decimals
        name
        symbol
      }
      txs {
        id
        block
        event
        from
        timestamp
        to
      }
      withdrawals {
        id
        amount
      }
    }
  }
`;

export default GET_STREAMS;
