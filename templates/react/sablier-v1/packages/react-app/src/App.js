import React from "react";
import logo from "./ethereumLogo.png";
import { MAINNET_ID, addresses, abis } from "@sablier-v1-app/contracts";
import { gql } from "apollo-boost";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";

const GET_STREAMS = gql`
  {
    streams(first: 10, orderBy: timestamp, orderDirection: desc) {
      id
      cancellation {
        recipientBalance
        recipientInterest
        timestamp
        txhash
      }
      deposit
      exchangeRateInitial
      ratePerSecond
      recipient
      recipientSharePercentage
      sender
      senderSharePercentage
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

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = ethers.getDefaultProvider();
  // Create an instance of ethers.Contract
  // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
  const sablierContract = new ethers.Contract(addresses[MAINNET_ID].sablier, abis.sablier, defaultProvider);
  // A pre-defined address that owns some cDAI tokens
  const nextStreamId = await sablierContract.nextStreamId();
  console.log({ nextStreamId: nextStreamId.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_STREAMS);

  React.useEffect(() => {
    if (!loading && !error && data && data.streams) {
      console.log({ streams: data.streams });
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "display: none" style and open the JavaScript console in the browser to see what this function does */}
        <button onClick={() => readOnChainData()} style={{ display: "none" }}>
          Read On-Chain Data
        </button>
        <a
          className="App-link"
          href="https://ethereum.org/developers/#getting-started"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: "0px" }}
        >
          Learn Ethereum
        </a>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <a className="App-link" href="https://docs.sablier.finance/" target="_blank" rel="noopener noreferrer">
          Learn Sablier v1
        </a>
      </header>
    </div>
  );
}

export default App;
