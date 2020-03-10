import React from "react";
import logo from "./ethereumLogo.png";
import { MAINNET_ID, addresses, abis } from "@compound-app/contracts";
import { gql } from "apollo-boost";
import { ethers } from "ethers";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";

const GET_MONEY_MARKETS = gql`
  {
    markets(first: 7) {
      borrowRate
      cash
      collateralFactor
      exchangeRate
      interestRateModelAddress
      name
      reserves
      supplyRate
      symbol
      id
      totalBorrows
      totalSupply
      underlyingAddress
      underlyingName
      underlyingPrice
      underlyingSymbol
      reserveFactor
      underlyingPriceUSD
    }
  }
`;

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = ethers.getDefaultProvider();
  // Create an instance of ethers.Contract
  // Read more about ethers.js on https://docs.ethers.io/ethers.js/html/api-contract.html
  const cDAIContract = new ethers.Contract(addresses[MAINNET_ID].tokens.cDAI, abis.tokens.cDAI, defaultProvider);
  // A pre-defined address that owns some cDAI tokens
  const cDAIBalance = await cDAIContract.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ cDAIBalance: cDAIBalance.toString() });
}

function App() {
  const { loading, error, data } = useQuery(GET_MONEY_MARKETS);

  React.useEffect(() => {
    if (!loading && !error && data && data.markets) {
      console.log({ markets: data.markets });
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        <button onClick={() => readOnChainData()} style={{ display: "none" }}>
          Read On-Chain Balance
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
        <a className="App-link" href="https://compound.finance/developers" target="_blank" rel="noopener noreferrer">
          Learn Compound
        </a>
      </header>
    </div>
  );
}

export default App;
